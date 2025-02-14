const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const verifyToken = require('../utils/authMiddleware');

const router = express.Router();

router.post('/order', verifyToken, createOrder);  // Initiate Razorpay payment
router.post('/verify', verifyToken, verifyPayment); // Verify payment success

module.exports = router;
