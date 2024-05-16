const { pool } = require('../config/data'); // Update to import the pool

class Vendor {
  async createVendor(vendorData) {
    try {
      const [result] = await pool.promise().query(
        'INSERT INTO VendorInfo SET ?', [vendorData]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async getVendorById(vendorId) {
    try {
      const [rows] = await [pool].promise().query(
        'SELECT * FROM VendorInfo WHERE VendorId = ? LIMIT 1', [vendorId]
      );
      return rows[0] || null; 
    } catch (error) {
      throw error;
    }
  }

  async getVendorByEmail(email) {
    try {
      const [rows] = await pool.promise().query(
        'SELECT * FROM VendorInfo WHERE Email = ? LIMIT 1', [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(vendorId, hashedPassword) {
    try {
      const [result] = await cpool.promise().query(
        'UPDATE VendorInfo SET PasswordHash = ? WHERE VendorId = ?', [hashedPassword, vendorId]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Vendor();