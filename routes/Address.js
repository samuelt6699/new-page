const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');

// Route for creating a new address
router.post('/', addressController.createAddress);

// Route for getting an address by ID
router.get('/:addressId', addressController.getAddressById);

// Route for updating an address by ID
router.put('/:addressId', addressController.updateAddress);

// Route for deleting an address by ID
router.delete('/:addressId', addressController.deleteAddress);

// Route for getting all addresses
router.get('/', addressController.getAllAddresses);

module.exports = router;