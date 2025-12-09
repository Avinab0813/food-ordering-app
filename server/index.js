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

// --- 1. CONFIGURATION ---
// Allow connections from your Deployed URL OR Localhost
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use(express.json());

// --- 2. SOCKET.IO SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
  },
});

// --- 3. DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// GET: Fetch Menu
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET: Fetch Orders (Admin)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- POST: MAGIC SEED ROUTE (Fixes Images & Descriptions) ---
app.post("/api/seed", async (req, res) => {
  try {
    // 1. Clear existing items to avoid duplicates
    await Food.deleteMany({}); 

    // 2. Add 15 High-Quality Items
    const menuItems = [
      // BURGERS
      { name: "Classic Cheese", price: 8.99, category: "Burger", description: "Juicy beef patty with melted cheddar, crisp lettuce, and tomato.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800" },
      { name: "Bacon Smash", price: 11.99, category: "Burger", description: "Smoked crispy bacon, onion rings, and house BBQ sauce.", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800" },
      { name: "Mushroom Swiss", price: 10.50, category: "Burger", description: "Sautéed mushrooms with creamy swiss cheese and truffle mayo.", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800" },

      // PIZZA
      { name: "Pepperoni Feast", price: 14.99, category: "Pizza", description: "Loaded with double pepperoni slices and mozzarella.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800" },
      { name: "Veggie Supreme", price: 13.50, category: "Pizza", description: "Bell peppers, red onions, mushrooms, and black olives.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800" },
      { name: "Margherita", price: 11.00, category: "Pizza", description: "Fresh basil, buffalo mozzarella, and extra virgin olive oil.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800" },

      // SALADS
      { name: "Caesar Salad", price: 9.50, category: "Salad", description: "Crisp romaine, parmesan cheese, croutons, and caesar dressing.", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800" },
      { name: "Greek Salad", price: 10.00, category: "Salad", description: "Feta cheese, kalamata olives, cucumber, and cherry tomatoes.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800" },

      // APPETIZERS
      { name: "Wings (6pcs)", price: 9.99, category: "Appetizer", description: "Spicy buffalo wings served with ranch dipping sauce.", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800" },
      { name: "Loaded Fries", price: 7.50, category: "Appetizer", description: "Golden fries topped with melted cheese and bacon bits.", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800" },
      { name: "Mozz Sticks", price: 6.99, category: "Appetizer", description: "Fried mozzarella cheese sticks with marinara sauce.", image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800" },

      // DESSERTS
      { name: "Lava Cake", price: 6.50, category: "Dessert", description: "Warm chocolate cake with a gooey molten center.", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800" },
      { name: "NY Cheesecake", price: 7.00, category: "Dessert", description: "Classic creamy cheesecake with strawberry topping.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800" },

      // DRINKS (Fixed Smoothie Image)
      { name: "Lemonade", price: 3.99, category: "Drink", description: "Ice cold freshly squeezed lemonade with mint.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800" },
      { name: "Berry Smoothie", price: 5.50, category: "Drink", description: "Fresh blend of strawberries, blueberries, and yogurt.", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800" }
    ];

    await Food.insertMany(menuItems);
    res.json({ message: "Menu updated with Images & Descriptions!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- POST: CHECKOUT (Payment) ---
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 1. Save Order to Database
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    const newOrder = new Order({
      customerName: "Guest User",
      items: cartItems,
      totalAmount: totalAmount,
      status: "Paid", 
    });
    await newOrder.save();

    // 2. Create Stripe Session
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
        unit_amount: 500, // $5.00
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/tracker`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    // 3. Simulate Socket Updates
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