const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingInfoController');

// Create shipping info
router.post('/', shippingController.createShippingInfo);

// Get shipping info by ID
router.get('/:shippingId',  shippingController.getShippingInfoById);

// Update shipping info by ID
router.put('/:shippingId', shippingController.updateShippingInfo);

// Delete shipping info by ID
router.delete('/:shippingId',  shippingController.deleteShippingInfo);

// Get all shipping info
router.get('/',  shippingController.getAllShippingInfo);

module.exports = router;
