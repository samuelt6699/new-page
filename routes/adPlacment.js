const express = require('express');
const router = express.Router();
const adPlacementController = require('../controllers/adPlacementController');

// Create a new ad placement
router.post('/', adPlacementController.createAdPlacement);

// Get a specific ad placement by ID
router.get('/:placementId', adPlacementController.getAdPlacementById);

// Get all ad placements
router.get('/', adPlacementController.getAllAdPlacements);

// Update an existing ad placement
router.put('/:placementId', adPlacementController.updateAdPlacement);

// Delete an existing ad placement
router.delete('/:placementId', adPlacementController.deleteAdPlacement);

module.exports = router;
