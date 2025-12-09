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
app.use(cors());
app.use(express.json());

// --- SOCKET.IO SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// 1. Get Menu
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Add Food (Seed data)
app.post("/api/foods", async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. Get All Orders (For Admin)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. CHECKOUT ROUTE (FIXED FOR CART ARRAY)
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    // We expect 'cartItems' (an Array) from the frontend now
    const { cartItems } = req.body;

    // Check if cart exists
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // --- SAVE ORDER TO MONGODB ---
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    const newOrder = new Order({
      customerName: "Guest User",
      items: cartItems,
      totalAmount: totalAmount,
      status: "Paid", 
    });
    await newOrder.save();
    // -----------------------------

    // Create Stripe Line Items
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // Images removed for safety
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    // Add Delivery Fee ($5)
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

    // Simulate Status Updates
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