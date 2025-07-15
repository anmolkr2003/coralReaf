exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user me role hona chahiye (protect middleware ke baad)
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};
