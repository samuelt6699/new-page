const { pool } = require('../config/data'); // Update to import the pool

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
}

module.exports = new Search();