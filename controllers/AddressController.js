const addressModel = require('../models/Address');

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    const addressData = req.body;
    const result = await addressModel.createAddress(addressData);
    res.status(201).json({ message: 'Address created successfully', addressId: result });
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ message: 'Failed to create address' });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await addressModel.getAddressById(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json(address);
  } catch (error) {
    console.error('Error fetching address by ID:', error);
    res.status(500).json({ message: 'Failed to retrieve address' });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updatedAddressData = req.body;
    const result = await addressModel.updateAddress(addressId, updatedAddressData);
    if (!result) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json({ message: 'Address updated successfully' });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Failed to update address' });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const result = await addressModel.deleteAddress(addressId);
    if (!result) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Failed to delete address' });
  }
};

// Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await addressModel.getAllAddresses();
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching all addresses:', error);
    res.status(500).json({ message: 'Failed to retrieve addresses' });
  }
};