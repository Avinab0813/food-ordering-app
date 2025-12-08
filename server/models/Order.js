const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, default: "Guest" },
  items: [
    {
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: Number,
  status: { 
    type: String, 
    default: "Paid" 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);