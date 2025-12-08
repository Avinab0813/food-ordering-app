const mongoose = require("mongoose");

// This is the Blueprint for a Food Item
const FoodSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String 
  },
  image: { 
    type: String // We will store the Image URL here
  },
  category: { 
    type: String // e.g., "Main Course", "Dessert"
  }
});

module.exports = mongoose.model("Food", FoodSchema);