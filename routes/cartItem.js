const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateToken = require('../models/authenticateToken')



router.post('/',authenticateToken, cartController.createCart);

router.get('/',authenticateToken, cartController.getAll );

//router.get('/:cardId', cartController.getCartItemById);

router.put('/:cartItemId',authenticateToken, cartController.updateCartItem);

router.delete('/:cartItemId',authenticateToken, cartController.deleteItem);

module.exports = router;
