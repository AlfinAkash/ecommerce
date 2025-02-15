const express = require('express');
const { getProducts, selectProduct } = require('../controllers/productController');
//const verifyToken = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', getProducts);  // Fetch all products
router.post('/select', selectProduct); // Select a product for checkout

module.exports = router;
