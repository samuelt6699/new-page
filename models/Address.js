const { pool } = require('../config/data');

class Address {
  async createAddress(addressData) {
    try {
      const query = 'INSERT INTO Addresses SET ?';
      const result = await pool.query(query, addressData); // Removed array destructuring
      return result[0].insertId; // Accessing result directly
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  }

  async getAddressById(addressId) {
    try {
      const query = 'SELECT * FROM Addresses WHERE AddressId = ?';
      const result = await pool.query(query, [addressId]); // Removed array destructuring
      console.log('Query Result:', result);
      return result.length ? result[0] : null; // Accessing result directly
    } catch (error) {
      console.error('Error fetching address by ID:', error);
      throw error;
    }
  }

  async updateAddress(addressId, updatedAddressData) {
    try {
      const query = 'UPDATE Addresses SET ? WHERE AddressId = ?';
      const result = await pool.query(query, [updatedAddressData, addressId]); // Removed array destructuring
      return result[0].affectedRows > 0; // Accessing result directly
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }

  async deleteAddress(addressId) {
    try {
      const query = 'DELETE FROM Addresses WHERE AddressId = ?';
      const result = await pool.query(query, [addressId]); // Removed array destructuring
      return result[0].affectedRows > 0; // Accessing result directly
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  }

  async getAllAddresses() {
    try {
      const query = 'SELECT * FROM Addresses';
      const result = await pool.query(query); // Removed array destructuring
      return result[0]; // Accessing result directly
    } catch (error) {
      console.error('Error fetching all addresses:', error);
      throw error;
    }
  }
}

module.exports = new Address();