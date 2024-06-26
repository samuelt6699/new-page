const { pool } = require('../config/data'); 

class Address {
  async createAddress(addressData) {
    try {
      const query = `INSERT INTO Addresses (Address1, Address2, City, State, PostalCode, Country, ClientId) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await pool.promise().query(query, [
        addressData.Address1,
        addressData.Address2,
        addressData.City,
        addressData.State,
        addressData.PostalCode,
        addressData.Country || 'USA',
        addressData.ClientId,
      ]);
      return result.insertId; 
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  }

  async getAddressById(addressId) {
    try {
      const [rows] = await pool.promise().query('SELECT * FROM Addresses WHERE AddressId = ?', [addressId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(addressId, updatedAddressData) {
    try {
      const [result] = await pool.promise().query('UPDATE Addresses SET ? WHERE AddressId = ?', [updatedAddressData, addressId]);
      return result.changedRows;
    } catch (error) {
      console.error(`Error updating address ${addressId}:`, error);
      throw error;
    }
  }

  async deleteAddress(addressId) {
    try {
      const [result] = await pool.promise().query('DELETE FROM Addresses WHERE AddressId = ?', [addressId]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  async getAllAddresses() {
    try {
      const [results] = await pool.promise().query('SELECT * FROM Addresses');
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Address();