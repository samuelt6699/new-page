const { pool } = require('../config/data'); // Ensure this points to your MySQL connection pool

class Search {
  async getProductsBySearchTerm(searchTerm) {
    try {
      const query = 'SELECT * FROM ProductItems WHERE Name LIKE ? OR Description LIKE ?';
      const [results] = await pool.promise().query(query, [`%${searchTerm}%`, `%${searchTerm}%`]);
      return results;
    } catch (error) {
      console.error("Error searching for products:", error.message || error);
      throw error;
    }
  }
  
  async getProductsByCategory(categoryName) {
    try {
      const sql = `
        SELECT ProductItems.*
        FROM ProductItems
        JOIN Categories ON ProductItems.CategoryId = Categories.CategoryId
        WHERE Categories.Name = ?
      `;
      const [products] = await pool.promise().query(sql, [categoryName]);
      return products;
    } catch (error) {
      console.error("Error fetching products by category:", error.message || error);
      throw error;
    }
  }
}

module.exports = new Search();