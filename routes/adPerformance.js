const express = require('express');
const router = express.Router();
const adPerformanceController = require('../controllers/adPerformanceController');

// Add performance data
router.post('/', adPerformanceController.addPerformanceData);

// Get performance data by ID
router.get('/:performanceId', adPerformanceController.getPerformanceDataById);

// Update performance data
router.put('/:performanceId', adPerformanceController.updatePerformanceData);

// Delete performance data
router.delete('/:performanceId', adPerformanceController.deletePerformanceData);

// Get all performance data
router.get('/', adPerformanceController.getAllPerformanceData);

module.exports = router;
