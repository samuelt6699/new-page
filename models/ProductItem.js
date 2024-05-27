const { pool } = require('../config/data'); // Ensure this points to your MySQL connection pool

class ProductItem {
  async createProduct(productData) {
    try {
      const [result] = await pool.promise().query(
        'INSERT INTO ProductItems SET ?', productData
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const [products] = await pool.promise().query('SELECT * FROM ProductItems');
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const [rows] = await pool.promise().query(
        'SELECT * FROM ProductItems WHERE ProductId = ?', [productId]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }
  
  async updateProduct(productId, productData) {
    try {
      const [result] = await pool.promise().query(
        'UPDATE ProductItems SET ? WHERE ProductId = ?', [productData, productId]
      );
      return result.changedRows;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const [result] = await pool.promise().query(
        'DELETE FROM ProductItems WHERE ProductId = ?', [productId]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
  
  async getProductsBySearchTerm(searchTerm) {
    try {
      const query = `
        SELECT * FROM ProductItems
        WHERE Name LIKE ? OR Description LIKE ?
      `;
      const [results] = await pool.promise().query(query, [`%${searchTerm}%`, `%${searchTerm}%`]);
      return results;
    } catch (error) {
      console.error("Error searching for products:", error.message || error);
      throw error;
    }
  }

}

module.exports = new ProductItem();