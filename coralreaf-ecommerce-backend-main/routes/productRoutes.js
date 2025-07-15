/**
 * ===========================================
 * @file        productRoutes.js
 * @description Routes for managing products.
 *              Only productManager admins can create, update, delete.
 *              Any admin can view (GET).
 * ===========================================
 */

const express = require("express");
const Product = require("../models/Product");
const { protectAdmin } = require("../middlewares/adminAuth");
const { authorizeAdminRoles } = require("../middlewares/authorizeAdminRoles");
const router = express.Router();

// ===========================
// ➕ Create Product
// ===========================
router.post(
  "/create",
  protectAdmin,
  authorizeAdminRoles("productManager"),
  async (req, res) => {
    const { name, description, price, discount, stock, category, imageUrl } = req.body;

    // Validation
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    try {
      const product = await Product.create({
        name,
        description,
        price,
        discount,      // New discount field
        stock,
        category,
        imageUrl,
      });

      res.status(201).json({ message: "Product created", product });
    } catch (err) {
      console.error("Create product error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ===========================
// 📄 Get All Products
// ===========================
router.get("/", protectAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===========================
// ✏️ Update Product
// ===========================
router.put(
  "/update/:id",
  protectAdmin,
  authorizeAdminRoles("productManager"),
  async (req, res) => {
    const updateFields = {};

    const { name, description, price, discount, stock, category, imageUrl, isActive } = req.body;

    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price !== undefined) updateFields.price = price;
    if (discount !== undefined) updateFields.discount = discount;
    if (stock !== undefined) updateFields.stock = stock;
    if (category) updateFields.category = category;
    if (imageUrl) updateFields.imageUrl = imageUrl;
    if (typeof isActive === "boolean") updateFields.isActive = isActive;

    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated", product });
    } catch (err) {
      console.error("Update product error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ===========================
// ❌ Delete Product
// ===========================
router.delete(
  "/delete/:id",
  protectAdmin,
  authorizeAdminRoles("productManager"),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      console.error("Delete product error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
