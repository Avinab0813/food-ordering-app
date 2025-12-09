const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, default: "Guest" },
  items: Array,
  totalAmount: Number,
  status: { type: String, default: "Paid" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);