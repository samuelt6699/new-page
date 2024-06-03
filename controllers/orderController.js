const orderModel = require('../models/orders');


// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        console.log("Creating order with data:", orderData); // Log the incoming order data

        const result = await orderModel.createOrder(orderData);
        res.status(201).json({ message: 'Order created successfully', orderId: result });
    } catch (error) {
        console.error('Error creating order:', error.message); // Log detailed error message
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error getting order by ID');
        res.status(500).json({ message: 'Failed to retrieve order' });
    }
};

// Update order
exports.updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrderData = req.body;
        const result = await orderModel.updateOrder(orderId, updatedOrderData);
        if (result === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order');
        res.status(500).json({ message: 'Failed to update order' });
    }
};

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const result = await orderModel.deleteOrder(orderId);
        if (result === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order');
        res.status(500).json({ message: 'Failed to delete order' });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting all orders');
        res.status(500).json({ message: 'Failed to retrieve orders' });
    }
};

