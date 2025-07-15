// 🛒 Cart Model – Stores cart data for each user
const mongoose = require("mongoose");

// 📦 Each item in the cart is represented by this sub-schema
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // 👈 Reference to product being added
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  { _id: false } // 👈 Prevent automatic _id for cart items
);

// 🧾 Main Cart Schema – one document per user
const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👤 Cart owner (user ID as _id)
      required: true,
    },
    items: [cartItemSchema], // 🛍️ Array of products in cart
  },
  { timestamps: true } // 🕒 createdAt and updatedAt auto-managed
);

module.exports = mongoose.model("Cart", cartSchema);