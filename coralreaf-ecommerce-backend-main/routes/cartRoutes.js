const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product"); // ✅ Import Product model

// ➕ Adds new product to cart or updates quantity if already present
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    // 🔍 Validate productId exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    let cart = await Cart.findById(userId);

    if (!cart) {
      // 🧾 Create new cart for user
      cart = await Cart.create({
        _id: userId,
        items: [{ productId, quantity }],
      });
      return res.status(201).json(cart);
    }

    // 🔄 Check if item is already in cart
    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Cart update failed", details: err.message });
  }
});

// 📤 Returns all items in user's cart with product details populated
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.userId).populate("items.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart", details: err.message });
  }
});

// 🔧 Updates quantity of a specific product in cart
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findById(userId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart item", details: err.message });
  }
});

// 🗑️ Removes a specific item from cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findByIdAndUpdate(
      userId,
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete cart item", details: err.message });
  }
});

module.exports = router;