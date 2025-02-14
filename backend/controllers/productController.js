const db = require('../config/db');

exports.getProducts = async (req, res) => {
    try {
        const [products] = await db.execute('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Select product for checkout
exports.selectProduct = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await db.execute('INSERT INTO orders (user_id, product_id, payment_status) VALUES (?, ?, ?)', [userId, productId, 'Pending']);
        res.json({ message: "Product added to checkout!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
