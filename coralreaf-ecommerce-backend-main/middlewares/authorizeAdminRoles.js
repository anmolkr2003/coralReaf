/**
 * ===========================================
 * @file        adminAuth.js
 * @description Middleware functions for admin authentication and role-based authorization.
 *              Includes protectAdmin for JWT check, and authorizeAdminRoles for role checking.
 * ===========================================
 */

/**
 * Middleware generator to authorize specific admin roles.
 * Accepts an array of allowed roles (e.g., ["superAdmin", "orderManager"]).
 * Checks if req.admin.role is included in allowed roles.
 *
 * Usage example in routes:
 * router.get("/some-protected-route", protectAdmin, authorizeAdminRoles("superAdmin", "productManager"), handler);
 */
exports.authorizeAdminRoles = (...roles) => {
  return (req, res, next) => {
    // Check if admin's role exists in allowed roles
    if (!roles.includes(req.admin.role)) {
      // If not, return forbidden error
      return res.status(403).json({ message: "Access denied for this role" });
    }

    // If role is allowed, proceed to next middleware or route handler
    next();
  };
};
