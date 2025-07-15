/**
 * ===========================================
 * @file        createSuperAdmin.js
 * @description Script to create (or recreate) a superAdmin.
 *              Deletes if exists, then creates fresh one.
 *              Fixes double hashing issue by sending plain password only.
 * ===========================================
 */

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ⬇️ Import Admin model
const Admin = require("./models/Admin"); // <-- Adjust path as needed

// ✅ Customize these
const name = "Super Admin";
const email = "superadmin@example.com";
const plainPassword = "yourStrongPasswordHere"; // <-- Your actual plain password
const role = "superAdmin";

// ⬇️ From .env
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "your_super_admin_secret_here";

(async () => {
  try {
    // ✅ Connect DB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // ✅ Check if already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("⚠️ Existing superAdmin found, deleting it...");

      await Admin.deleteOne({ email });
      console.log("🗑️ Existing superAdmin deleted.");
    }

    // ✅ Create new superAdmin with plain password (Model will hash it)
    const newAdmin = await Admin.create({
      name,
      email,
      password: plainPassword, // ✅ Send plain password only
      role,
      isActive: true,
    });

    // ✅ Generate JWT token
    const token = jwt.sign({ id: newAdmin._id, role: newAdmin.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Logs
    console.log("✅ New superAdmin created successfully!");
    console.log("🔑 Token:", token);
    console.log("🟢 Email:", email);
    console.log("🟢 Plain Password:", plainPassword);
    console.log("🟢 Hashed Password (fetched from DB):", newAdmin.password);

    // ✅ Disconnect & exit
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
})();
