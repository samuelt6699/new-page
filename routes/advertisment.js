const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController');

// Routes for Advertisements
router.post('/', advertisementController.createAdvertisement);
router.get('/:adId', advertisementController.getAdvertisementById);
router.put('/:adId', advertisementController.updateAdvertisement);
router.delete('/:adId', advertisementController.deleteAdvertisement);
router.get('/', advertisementController.getAllAdvertisements);
router.get('/advertiser/:advertiserId', advertisementController.getAdvertisementsByAdvertiserId);

module.exports = router;
