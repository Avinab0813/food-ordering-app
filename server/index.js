const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

// Import Models
const Food = require("./models/Food");
const Order = require("./models/Order"); // Import the Order Model

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// --- SOCKET.IO ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

// --- DATABASE ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// 1. Get Menu
app.get("/api/foods", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

// 2. Add Food (Seed data)
app.post("/api/foods", async (req, res) => {
  const newFood = new Food(req.body);
  await newFood.save();
  res.status(201).json(newFood);
});

// 3. Get All Orders (For Admin Dashboard)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. CHECKOUT & SAVE ORDER
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    // --- SAVE ORDER TO MONGODB ---
    const newOrder = new Order({
      customerName: "Guest User",
      items: products,
      totalAmount: products.reduce((sum, item) => sum + item.price, 0),
      status: "Paid", // In a real app, we would verify this via Webhook
    });
    await newOrder.save(); 
    // -----------------------------

    // Create Stripe Session
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/tracker`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // Simulate Updates
    setTimeout(() => io.emit("order_status", "Preparing your food 🍳"), 5000);
    setTimeout(() => io.emit("order_status", "Out for Delivery 🛵"), 10000);
    setTimeout(() => io.emit("order_status", "Delivered! 😋"), 15000);

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});