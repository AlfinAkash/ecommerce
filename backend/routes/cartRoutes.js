const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/cart/add', addToCart);
router.get('/cart/:user_id', getCart);
router.delete('/cart/remove', removeFromCart);

module.exports = router;
