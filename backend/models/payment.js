const db = require('../config/db');

const createPaymentTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        cashback DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );`;
    await db.execute(query);
};

createPaymentTable();

module.exports = db;
