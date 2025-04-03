const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    console.log("🔹 Received Token:", token); // Debug log

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    console.log("🔹 Token After Bearer Removal:", token); // Debug log

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("✅ Decoded User:", req.user); // Debug log

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token, please log in again" });
    }

    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { protect };


// Admin Middleware (Restrict Access to Admins Only)
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user data found" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins Only" });
  }
  next();
};

module.exports = { protect, adminOnly };
