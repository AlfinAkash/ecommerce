const db = require('../config/db');

const createUserTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );`;
    await db.execute(query);
};

createUserTable();

module.exports = db;
