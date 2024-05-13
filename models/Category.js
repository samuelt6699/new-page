const { connection } = require('../config/data');

class Category {
  async createCategory(categoryData) {
    try {
      const [result] = await connection.promise().query(
        'INSERT INTO Categories SET ?', categoryData
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const [categories] = await connection.promise().query('SELECT * FROM Categories');
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(categoryId) {
    try {
      const [rows] = await connection.promise().query(
        'SELECT * FROM Categories WHERE CategoryId = ?', [categoryId]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      const [result] = await connection.promise().query(
        'UPDATE Categories SET ? WHERE CategoryId = ?', [categoryData, categoryId]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(categoryId) {
    try {
      const [result] = await connection.promise().query(
        'DELETE FROM Categories WHERE CategoryId = ?', [categoryId]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Category();