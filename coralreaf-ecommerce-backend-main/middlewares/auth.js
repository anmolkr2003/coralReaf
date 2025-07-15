/**
 * ===========================================
 * @file        auth.js
 * @description Middleware to protect routes.
 *              Validates JWT token and attaches user object to request.
 *              Used for authenticating logged-in users.
 * ===========================================
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes using JWT authentication.
 * Checks Authorization header for Bearer token, verifies it,
 * and attaches the corresponding user document to req.user.
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found, return unauthorized error
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify token using JWT_SECRET from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with this token
    const user = await User.findById(decoded.id);

    // If user does not exist, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user object to request for next middleware or route handler
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
