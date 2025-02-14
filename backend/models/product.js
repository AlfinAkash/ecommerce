const db = require('../config/db');

const Product = {
    createTable: () => {
        const query = `
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                description TEXT NOT NULL,
                stock INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        db.query(query, (err) => {
            if (err) console.error("Error creating products table:", err);
            else console.log("Products table created successfully!");
        });
    }
};

module.exports = Product;
