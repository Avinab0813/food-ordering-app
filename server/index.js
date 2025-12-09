const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

// Import Models
const Food = require("./models/Food");
const Order = require("./models/Order");

dotenv.config();

// Initialize Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// --- 1. DEPLOYMENT CONFIGURATION (CORS) ---
// This tells the server: "Allow connections from the variable CLIENT_URL, 
// OR if that's missing, allow localhost:3000"
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use(express.json());

// --- 2. SOCKET.IO SETUP (Deployment Ready) ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigin, // Connects to Vercel or Localhost
    methods: ["GET", "POST"],
  },
});

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// GET Menu
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- 3. NEW: SEED ROUTE (To fix your images instantly) ---
// Trigger this once using Postman (POST http://localhost:5000/api/seed)
// It will clear your menu and add 5 professional items.
app.post("/api/seed", async (req, res) => {
  try {
    // Clear existing food
    await Food.deleteMany({}); 

    const sampleFoods = [
      {
        name: "Classic Cheeseburger",
        price: 8.99,
        description: "Juicy beef patty with melted cheddar, lettuce, and tomato.",
        category: "Burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60"
      },
      {
        name: "Pepperoni Pizza",
        price: 14.99,
        description: "Crispy crust topped with spicy pepperoni and mozzarella.",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=60"
      },
      {
        name: "Sushi Platter",
        price: 22.50,
        description: "Assorted fresh nigiri and maki rolls.",
        category: "Sushi",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=60"
      },
      {
        name: "Spicy Pasta",
        price: 12.00,
        description: "Homemade pasta with a rich, spicy tomato basil sauce.",
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=800&q=60"
      },
      {
        name: "Caesar Salad",
        price: 9.50,
        description: "Fresh romaine lettuce, croutons, parmesan, and caesar dressing.",
        category: "Salad",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=60"
      }
    ];

    await Food.insertMany(sampleFoods);
    res.json({ message: "Menu updated with High-Quality Images!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add Food Manually
app.post("/api/foods", async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Orders (Admin)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CHECKOUT ROUTE
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Save Order to MongoDB
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    const newOrder = new Order({
      customerName: "Guest User",
      items: cartItems,
      totalAmount: totalAmount,
      status: "Paid", 
    });
    await newOrder.save();

    // Create Stripe Line Items
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Add Delivery Fee
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Fee" },
        unit_amount: 500,
      },
      quantity: 1,
    });

    // Create Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/tracker`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    // Simulate Updates
    setTimeout(() => io.emit("order_status", "Preparing your food 🍳"), 5000);
    setTimeout(() => io.emit("order_status", "Out for Delivery 🛵"), 10000);
    setTimeout(() => io.emit("order_status", "Delivered! 😋"), 15000);

    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});