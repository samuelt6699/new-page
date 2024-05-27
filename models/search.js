const { pool } = require('../config/data'); 

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

}

module.exports = new Search();