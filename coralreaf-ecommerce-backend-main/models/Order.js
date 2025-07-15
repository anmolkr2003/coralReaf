const mongoose = require("mongoose");
const User = require('../models/User');


const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing',
  },
  orderedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// ✅ Avoid OverwriteModelError in dev or hot reload
// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = mongoose.model("Order", orderSchema);
// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// module.exports = Order;
