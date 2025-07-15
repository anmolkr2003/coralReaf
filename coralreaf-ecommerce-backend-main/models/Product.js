/**
 * ===========================================
 * @file        Product.js
 * @description Mongoose schema & model for products.
 *              Only productManager admins can manage.
 * ===========================================
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0, // Discount percentage, e.g., 10 means 10% off
      min: 0,
      max: 100,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
