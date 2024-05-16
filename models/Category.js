const { pool } = require('../config/data'); // Update to import the pool

class Category {
  async createCategory(categoryData) {
    try {
      const [result] = await pool.promise().query(
        'INSERT INTO Categories SET ?', categoryData
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const [categories] = await pool.promise().query('SELECT * FROM Categories');
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(categoryId) {
    try {
      const [rows] = await pool.promise().query(
        'SELECT * FROM Categories WHERE CategoryId = ?', [categoryId]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      const [result] = await pool.promise().query(
        'UPDATE Categories SET ? WHERE CategoryId = ?', [categoryData, categoryId]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(categoryId) {
    try {
      const [result] = await pool.promise().query(
        'DELETE FROM Categories WHERE CategoryId = ?', [categoryId]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Category();