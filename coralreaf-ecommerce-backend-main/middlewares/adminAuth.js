/**
 * ===========================================
 * @file        adminAuth.js
 * @description Middleware to protect admin-only routes.
 *              Verifies JWT token for admin authentication.
 * ===========================================
 */

const jwt = require("jsonwebtoken");

/**
 * Middleware to protect admin routes using JWT authentication.
 * Checks Authorization header for Bearer token, verifies it,
 * and attaches admin payload to req.admin.
 */
exports.protectAdmin = (req, res, next) => {
  try {
    // Get Authorization header from request
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized admin" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token using secret key (change to env variable for production)
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET || "your_super_admin_secret_here");

    // Attach decoded payload (e.g., id, role) to request object
    req.admin = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    console.error("Admin token verification error:", err);
    return res.status(401).json({ message: "Invalid admin token" });
  }
};
