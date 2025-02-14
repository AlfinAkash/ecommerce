const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../utils/authMiddleware"); // Import auth middleware

// ✅ Apply authMiddleware to signup, verify-email, and login
router.post("/signup", authController.signup);
router.post("/login", authMiddleware, authController.login);
router.post("/verify-otp", authController.verifyOTP); // ✅ Add verifyOTP route



module.exports = router;
