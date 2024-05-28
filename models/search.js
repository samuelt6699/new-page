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

  // Add the search functionality by description here
  async searchProducts(query) {
    try {
      // Define the SQL query to search products by description
      const sql = `
        SELECT * FROM ProductItems
        WHERE Name  LIke? description LIKE ?
      `;

      // Execute the query with the query as the parameter
      const [products] = await pool.promise().query(sql, [`%${query}%`]);
      
      // Return the retrieved products
      return products;
    } catch (error) {
      throw error;
    }
  }
}
 
module.exports = new Search();