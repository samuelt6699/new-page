const { pool } = require('../config/data'); // Correct the typo

class Order {
  // Create a new order
  async createOrder(orderData) {
    try {
      const query = 'INSERT INTO Orders SET ?';
      const [result] = await pool.promise().query(query, orderData);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const query = 'SELECT * FROM Orders WHERE OrderId = ?';
      const [order] = await pool.promise().query(query, [orderId]);
      return order[0];
    } catch (error) {
      throw error;
    }
  }

  // Update order
  async updateOrder(orderId, updatedOrderData) {
    try {
      const query = 'UPDATE Orders SET ? WHERE OrderId = ?';
      const [result] = await pool.promise().query(query, [updatedOrderData, orderId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete order
  async deleteOrder(orderId) {
    try {
      const query = 'DELETE FROM Orders WHERE OrderId = ?';
      const [result] = await pool.promise().query(query, [orderId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get all orders
  async getAllOrders() {
    try {
      const query = 'SELECT * FROM Orders';
      const [orders] = await pool.promise().query(query);
      return orders;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Order();