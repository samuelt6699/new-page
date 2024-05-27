const ShippingInfo = require('../models/shippingInfo');
const Order = require('../models/Order');

exports.createShippingInfo = async (req, res) => {
    try {
        const { orderId, ...shippingData } = req.body;

        // Check if the order exists
        const order = await Order.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Add shipping info
        const result = await ShippingInfo.createShippingInfo({ ...shippingData, OrderId: orderId });
        res.status(201).json({ message: 'Shipping info created successfully', shippingId: result.insertId });
    } catch (error) {
        console.error('Error creating shipping info:', error);
        res.status(500).json({ message: 'Failed to create shipping info' });
    }
};

exports.getShippingInfoById = async (req, res) => {
    try {
        const { shippingId } = req.params;
        const shippingInfo = await ShippingInfo.getShippingInfoById(shippingId);
        if (!shippingInfo) {
            return res.status(404).json({ message: 'Shipping info not found' });
        }

        // Get order details
        const order = await Order.getOrderById(shippingInfo.OrderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ shippingInfo, order });
    } catch (error) {
        console.error('Error getting shipping info by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve shipping info' });
    }
};

exports.updateShippingInfo = async (req, res) => {
    try {
        const { shippingId } = req.params;
        const shippingData = req.body;

        // Check if the shipping info exists
        const existingShippingInfo = await ShippingInfo.getShippingInfoById(shippingId);
        if (!existingShippingInfo) {
            return res.status(404).json({ message: 'Shipping info not found' });
        }

        // Update shipping info
        const result = await ShippingInfo.updateShippingInfo(shippingId, shippingData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Shipping info not found' });
        }

        res.status(200).json({ message: 'Shipping info updated successfully' });
    } catch (error) {
        console.error('Error updating shipping info:', error);
        res.status(500).json({ message: 'Failed to update shipping info' });
    }
};

exports.deleteShippingInfo = async (req, res) => {
    try {
        const { shippingId } = req.params;

        // Check if the shipping info exists
        const existingShippingInfo = await ShippingInfo.getShippingInfoById(shippingId);
        if (!existingShippingInfo) {
            return res.status(404).json({ message: 'Shipping info not found' });
        }

        // Delete shipping info
        const result = await ShippingInfo.deleteShippingInfo(shippingId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Shipping info not found' });
        }

        res.status(200).json({ message: 'Shipping info deleted successfully' });
    } catch (error) {
        console.error('Error deleting shipping info:', error);
        res.status(500).json({ message: 'Failed to delete shipping info' });
    }
};

exports.getAllShippingInfo = async (req, res) => {
    try {
        const shippingInfoList = await ShippingInfo.getAllShippingInfo();
        if (!shippingInfoList.length) {
            return res.status(404).json({ message: 'No shipping info found' });
        }

        // Get order details for each shipping info
        const shippingInfoWithOrders = await Promise.all(shippingInfoList.map(async (shippingInfo) => {
            const order = await Order.getOrderById(shippingInfo.OrderId);
            return { ...shippingInfo, order };
        }));

        res.status(200).json(shippingInfoWithOrders);
    } catch (error) {
        console.error('Error getting all shipping info:', error);
        res.status(500).json({ message: 'Failed to retrieve shipping info' });
    }
};
