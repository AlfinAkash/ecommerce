const db = require('../config/db');

// Add product to cart
exports.addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    try {
        const query = `
            INSERT INTO cart (user_id, product_id, quantity) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE quantity = quantity + ?;
        `;
        await db.query(query, [user_id, product_id, quantity || 1, quantity || 1]);
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get cart items for a user
exports.getCart = async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = `
            SELECT c.id, c.quantity, p.id AS product_id, p.name, p.price 
            FROM cart c 
            JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = ?;
        `;
        const [cartItems] = await db.query(query, [user_id]);
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    const { user_id, product_id } = req.body;

    try {
        const query = `DELETE FROM cart WHERE user_id = ? AND product_id = ?;`;
        await db.query(query, [user_id, product_id]);
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
