require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Needed for verifying Razorpay signatures
const db = require('../config/db');

// Ensure Razorpay keys are provided
if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
    console.error("❌ Missing Razorpay credentials in environment variables");
    process.exit(1); // Stop the server if keys are not set
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});

// Create Order API
exports.createOrder = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        if (!userId || !productId) {
            return res.status(400).json({ message: "User ID and Product ID are required." });
        }

        const [products] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
        if (products.length === 0) return res.status(404).json({ message: "Product not found" });

        const amount = products[0].price * 100; // Convert to paise

        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `order_${userId}_${productId}`,
            payment_capture: 1 // Auto-capture payment
        });

        res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ message: "Error creating Razorpay order" });
    }
};

// Verify Payment API
exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature, userId } = req.body;

    try {
        if (!order_id || !payment_id || !signature) {
            return res.status(400).json({ message: "Missing payment details." });
        }

        // Generate expected signature
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${order_id}|${payment_id}`)
            .digest('hex');

        if (expectedSignature !== signature) {
            return res.status(400).json({ message: "Invalid payment signature!" });
        }

        // Update order status in the database
        await db.execute(
            'UPDATE orders SET payment_status = ? WHERE user_id = ? AND order_id = ?',
            ['Completed', userId, order_id]
        );

        res.json({ message: "Payment verified successfully!" });
    } catch (error) {
        console.error("❌ Error verifying payment:", error);
        res.status(500).json({ message: "Payment verification failed" });
    }
};
