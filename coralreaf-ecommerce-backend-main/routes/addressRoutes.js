const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserAddress = require("../models/Address");


// ✅ [POST] Add a new address for a user
// If user already has an address document, push to it
// Otherwise, create a new document with the first address
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const newAddress = req.body;

  try {
    const existing = await UserAddress.findById(userId);

    if (existing) {
      // Add new address to existing array
      existing.addresses.push(newAddress);
      await existing.save();
      return res.status(200).json(existing);
    } else {
      // Create new document for this user
      const created = await UserAddress.create({
        _id: userId,
        addresses: [newAddress],
      });
      return res.status(201).json(created);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to add address", details: err });
  }
});


// 📥 [GET] Get all addresses of a user
// Returns the array of addresses for a given userId
router.get("/:userId", async (req, res) => {
  try {
    const data = await UserAddress.findById(req.params.userId);
    if (!data) return res.status(404).json({ message: "No addresses found" });
    res.json(data.addresses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch addresses", details: err });
  }
});


// ✏️ [PUT] Update a specific address by addressId
// Uses MongoDB positional operator to update the matched address
router.put("/:userId/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;
  const updatedFields = req.body;

  try {
    const result = await UserAddress.updateOne(
      { _id: userId, "addresses._id": addressId },
      { $set: { "addresses.$": { _id: addressId, ...updatedFields } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Address not found or not updated" });
    }

    res.json({ message: "Address updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update address", details: err });
  }
});


// ❌ [DELETE] Remove a specific address by addressId
// Uses $pull to remove the address from the array
router.delete("/:userId/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const result = await UserAddress.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: new mongoose.Types.ObjectId(addressId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Address not found or not deleted" });
    }

    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete address", details: err });
  }
});

module.exports = router;