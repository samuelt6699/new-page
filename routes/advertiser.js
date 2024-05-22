const express = require('express');
const router = express.Router();
const advertiserController = require('../controllers/advertiserController');

// Create a new advertiser
router.post('/', advertiserController.createAdvertiser);

// Get an advertiser by ID
router.get('/:advertiserId', advertiserController.getAdvertiserById);

// Update an advertiser by ID
router.put('/:advertiserId', advertiserController.updateAdvertiser);

// Delete an advertiser by ID
router.delete('/:advertiserId', advertiserController.deleteAdvertiser);

// Get all advertisers
router.get('/', advertiserController.getAllAdvertisers);

module.exports = router;
