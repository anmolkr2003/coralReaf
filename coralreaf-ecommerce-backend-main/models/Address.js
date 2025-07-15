const mongoose = require("mongoose");

// 📦 Embedded Address Sub-Schema with _id
const singleAddressSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(), // 👈 Auto-generate _id
    },
    fullName: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Invalid phone number"],
    },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false } // 👈 This disables auto _id for the schema itself, but we define it manually above
);

// 📄 Main Schema: One document per user
const userAddressSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addresses: [singleAddressSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAddress", userAddressSchema);