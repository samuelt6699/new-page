const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route for creating a new order
router.post('/', orderController.createOrder);

// Route for getting an order by ID
router.get('/:orderId', orderController.getOrderById);

// Route for updating an order by ID
router.put('/:orderId', orderController.updateOrder);

// Route for deleting an order by ID
router.delete('/:orderId', orderController.deleteOrder);

// Route for getting all orders
router.get('/', orderController.getAllOrders);

module.exports = router;
