const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// 📦 Create a new order
router.post('/', verifyToken, async (req, res) => {
  const { items, shippingAddress, totalAmount } = req.body;
  console.log("Authenticated user:", req.user);

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order must contain items.' });
  }

  try {
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      paymentStatus: 'pending',
      orderStatus: 'processing',
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({ message: 'Unable to create order.' });
  }
});

// 📋 Get all orders for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Fetching orders failed:', error.message);
    res.status(500).json({ message: 'Unable to fetch orders.' });
  }
});

// 🔎 Get a specific order by ID
router.get('/:id', verifyToken, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Order ID.' });
  }

  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    res.status(200).json(order);
  } catch (error) {
    console.error('Fetching order failed:', error.message);
    res.status(500).json({ message: 'Unable to retrieve order.' });
  }
});

// 🗑️ Delete an order by ID
router.delete('/:id', verifyToken, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Order ID.' });
  }

  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) return res.status(404).json({ message: 'Order not found or unauthorized.' });

    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error('Order deletion failed:', error.message);
    res.status(500).json({ message: 'Unable to delete order.' });
  }
});

module.exports = router;