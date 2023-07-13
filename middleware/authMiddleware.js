// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token." });
    }

    req.userId = decoded.userId;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  // Assuming "role" field is present in the User model
  User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving user data." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    next();
  });
};
