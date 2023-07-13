const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/protected", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Admin access granted." });
});

module.exports = router;
