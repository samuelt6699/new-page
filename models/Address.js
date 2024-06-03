const { pool } = require('../config/data');

class Address {
  async createAddress(addressData) {
    try {
      const query = 'INSERT INTO Addresses SET ?';
      const [result] = await pool.query(query, addressData);
      return result.insertId;
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  }

  async getAddressById(addressId) {
    try {
      const query = 'SELECT * FROM Addresses WHERE AddressId = ?';
      const [results] = await pool.query(query, [addressId]);
      if (results.length === 0) {
        return null;
      }
      return results[0];
    } catch (error) {
      console.error('Error fetching address by ID:', error);
      throw error;
    }
  }

  async updateAddress(addressId, updatedAddressData) {
    try {
      const query = 'UPDATE Addresses SET ? WHERE AddressId = ?';
      const [result] = await pool.query(query, [updatedAddressData, addressId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }

  async deleteAddress(addressId) {
    try {
      const query = 'DELETE FROM Addresses WHERE AddressId = ?';
      const [result] = await pool.query(query, [addressId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  }

  async getAllAddresses() {
    try {
      const query = 'SELECT * FROM Addresses';
      const [addresses] = await pool.query(query);
      return addresses;
    } catch (error) {
      console.error('Error fetching all addresses:', error);
      throw error;
    }
  }
}

module.exports = new Address();