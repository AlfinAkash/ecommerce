const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOTP = require('../config/email');

const otpStore = new Map(); // Temporary storage for OTPs

// Signup: Register User & Send OTP
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // Expires in 10 min

        // Send OTP via email
        await sendOTP(email, otp);

        res.json({ message: "OTP sent to email. Verify OTP to complete signup." });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};





exports.verifyOtpAndSignup = async (req, res) => {
    const { name, email, password, otp } = req.body;

    if (!otp || !email || !password || !name) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if OTP exists
        const storedOtpData = otpStore.get(email);
        if (!storedOtpData || storedOtpData.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP or expired" });
        }

        // Remove OTP after verification
        otpStore.delete(email);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into DB
        await db.execute("INSERT INTO users (name, email, password, isVerified) VALUES (?, ?, ?, ?)", 
            [name, email, hashedPassword, true]);

        // Get newly created user
        const [newUser] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);

        // Generate JWT token
        const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store JWT in cookie
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600000 });

        res.json({ message: "Signup successful!", token });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// OTP Verification (Without Storing in DB)
exports.verifyOTP = async (req, res) => {
    const { email, otp, name, password } = req.body;

    if (!email || !otp || !name || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Check if OTP exists
        if (!otpStore.has(email)) {
            return res.status(400).json({ message: "OTP expired or not found!" });
        }

        const storedOTP = otpStore.get(email);

        // Validate OTP
        if (storedOTP.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP!" });
        }

        // Check OTP expiration
        if (Date.now() > storedOTP.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: "OTP expired!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in DB
        await db.execute(
            'INSERT INTO users (name, email, password, isVerified) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, true]
        );

        // Remove OTP from store after successful signup
        otpStore.delete(email);

        res.json({ message: "User verified & registered successfully!" });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Login after verification
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user details
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: "User not found!" });

        const user = users[0];

        // Check if user is verified
        if (!user.isVerified) return res.status(401).json({ message: "Verify your account first!" });

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store JWT in cookie
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600000 });

        res.json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

