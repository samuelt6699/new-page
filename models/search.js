const { pool } = require('../config/data'); // Import the pool

class Search {
  // Use the async/await syntax for asynchronous code
  async getProductsByCategory(categoryName) {
    try {
      // Define the SQL query, joining the ProductItems and Categories tables
      const sql = `
        SELECT ProductItems.*
        FROM ProductItems
        JOIN Categories ON ProductItems.CategoryId = Categories.CategoryId
        WHERE Categories.Name = ?
      `;

      // Execute the query with the categoryName as the parameter
      const [products] = await pool.promise().query(sql, [categoryName]);

      // Return the retrieved products
      return products;
    } catch (error) {
      throw error;
    }
  }

  // Search functionality by description
  async searchProducts(query) {
    try {
      // Define the SQL query for searching product descriptions
      // Fix the SQL syntax: Use `AND` for multiple conditions, fix the SQL placeholders
      const sql = `
        SELECT * FROM ProductItems
        WHERE Name LIKE ? OR Description LIKE ?
      `;

      // Execute the query with the `query` as the parameter for both placeholders
      const [products] = await pool.promise().query(sql, [`%${query}%`, `%${query}%`]);

      // Return the retrieved products
      return products;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Search();