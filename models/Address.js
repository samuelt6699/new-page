const { pool } = require('../config/data');

class Address {
    async createAddress(addressData) {
        try {
            const query = 'INSERT INTO Addresses SET ?';
            const [result] = await pool.query(query, addressData);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getAddressById(addressId) {
        try {
            const query = 'SELECT * FROM Addresses WHERE AddressId = ?';
            const [address] = await pool.query(query, [addressId]);
            return address[0];
        } catch (error) {
            throw error;
        }
    }

    async updateAddress(addressId, updatedAddressData) {
        try {
            const query = 'UPDATE Addresses SET ? WHERE AddressId = ?';
            const [result] = await pool.query(query, [updatedAddressData, addressId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteAddress(addressId) {
        try {
            const query = 'DELETE FROM Addresses WHERE AddressId = ?';
            const [result] = await pool.query(query, [addressId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async getAllAddresses() {
        try {
            const query = 'SELECT * FROM Addresses';
            const [addresses] = await pool.query(query);
            return addresses;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Address();