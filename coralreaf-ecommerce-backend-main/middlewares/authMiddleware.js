const jwt = require('jsonwebtoken');

// ✅ JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔍 Check for token presence and format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract actual token
  console.log('🔍 Token received:', token); // Optional: debug log

  try {
    // 🔐 Decode and verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ⚠️ Use correct key based on token payload (your token uses `id`)
    req.user = { _id: decoded.id }; // ✅ Fix applied here

    console.log('🧑 Authenticated user:', req.user); // Optional: verify user context
    next();
  } catch (err) {
    console.error('🚫 Token verification error:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };