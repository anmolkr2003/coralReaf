/**
 * ===========================================
 * @file        adminRoutes.js
 * @description Routes for managing admin users.
 *              Includes login, create, list, update, and delete.
 *              All routes protected by JWT and role-based access.
 * ===========================================
 */

const express = require("express");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { protectAdmin } = require("../middlewares/adminAuth");
const { authorizeAdminRoles } = require("../middlewares/authorizeAdminRoles");
const router = express.Router();

// =======================
// 🔐 Admin Login
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email and include password explicitly
    const admin = await Admin.findOne({ email }).select("+password");
    console.log(admin);
    console.log(admin.password);

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Sign JWT using env secret
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// 👤 Create new admin (only superAdmin)
// =======================
router.post("/create", protectAdmin, authorizeAdminRoles("superAdmin"), async (req, res) => {
  console.log("req.body => ", req.body);
  const { name, email, password, role } = req.body;
  

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create new admin
    const newAdmin = await Admin.create({ name, email, password, role });

    res.status(201).json({
      message: `${role} created`,
      admin: {
        id: newAdmin._id,
        name,
        email,
        role,
      },
    });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// 📄 Get all admins (only superAdmin)
// =======================
router.get("/all", protectAdmin, authorizeAdminRoles("superAdmin"), async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (err) {
    console.error("Get admins error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// ✏️ Update admin role or status (only superAdmin)
// =======================
router.put("/update/:id", protectAdmin, authorizeAdminRoles("superAdmin"), async (req, res) => {
  const { role, isActive } = req.body;

  try {
    // Prevent superAdmin from modifying themselves
    if (req.params.id === req.admin.id) {
      return res.status(400).json({ message: "You cannot update your own role or status" });
    }

    // Build update object only with provided fields
    const updateFields = {};
    if (role) updateFields.role = role;
    if (typeof isActive === "boolean") updateFields.isActive = isActive;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated", admin });
  } catch (err) {
    console.error("Update admin error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// ❌ Delete admin (only superAdmin)
// =======================
router.delete("/delete/:id", protectAdmin, authorizeAdminRoles("superAdmin"), async (req, res) => {
  try {
    // Prevent superAdmin from deleting themselves
    if (req.params.id === req.admin.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    console.error("Delete admin error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
