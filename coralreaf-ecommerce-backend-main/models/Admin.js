/**
 * ===========================================
 * @file        Admin.js
 * @description Mongoose schema and model for Admin users.
 *              Supports multiple roles (superAdmin, productManager, etc.).
 *              Handles password hashing and comparison.
 *              Used for admin panel authentication & authorization.
 * ===========================================
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Admin schema
const adminSchema = new mongoose.Schema(
  {
    // Name of the admin
    name: {
      type: String,        // Data type is String
      required: true,      // Name is mandatory
      trim: true,          // Removes whitespace before and after
      minlength: 2,        // Minimum length: 2 characters
      maxlength: 50,       // Maximum length: 50 characters
    },

    // Email of the admin (used for login)
    email: {
      type: String,        // Data type is String
      required: true,      // Email is mandatory
      unique: true,        // Email must be unique in the collection
      lowercase: true,     // Always store in lowercase
      trim: true,          // Remove whitespace
    },

    // Hashed password
    password: {
      type: String,        // Data type is String
      required: true,      // Password is mandatory
      minlength: 6,        // Minimum length: 6 characters
      select: false,       // Do not return this field by default in queries
    },

    // Role of the admin (can be various predefined roles)
    role: {
      type: String,
      enum: [
        "superAdmin",        // Super admin — can manage all admins
        "productManager",    // Handles products
        "orderManager",      // Manages orders
        "customerSupport",   // Handles customer queries
        "analyst",           // Can analyze data and reports
        "userManager",       // Manages user accounts
        "marketingManager",  // Marketing related tasks
        "qaTester",          // Testing related activities
        "admin"              // Generic admin role
      ],
      default: "admin",     // Default role set as 'admin'
    },

    // Active status — useful for temporarily disabling an admin
    isActive: {
      type: Boolean,
      default: true,       // By default, admin is active
    },
  },
  {
    timestamps: true,       // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save middleware to hash password before saving
adminSchema.pre("save", async function (next) {
  // If password field is not modified, skip hashing
  if (!this.isModified("password")) return next();

  // Hash password with salt rounds = 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare entered password with stored hashed password
adminSchema.methods.comparePassword = async function (candidatePassword) {
  // bcrypt.compare returns true if passwords match
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the model
module.exports = mongoose.model("Admin", adminSchema);
