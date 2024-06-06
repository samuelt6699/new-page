const { pool } = require('../config/data'); 

class Order {
  async createOrder(orderData) {
    try {
      const query = `INSERT INTO Orders (ClientId, OrderDate, PaymentMethod, ShippingAddressId, BillingAddressId, ShippingPrice, FinalTotal)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await pool.promise().query(query, [
        orderData.ClientId,
        orderData.OrderDate,
        orderData.PaymentMethod,
        orderData.ShippingAddressId,
        orderData.BillingAddressId,
        orderData.ShippingPrice,
        orderData.FinalTotal
      ]);
      return result.insertId; 
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async createOrderDetails(orderDetails) {
    try {
      const query = `INSERT INTO OrderDetails (OrderId, ProductId, Quantity, PriceAtOrder)
                     VALUES ?`;
      const values = orderDetails.map(detail => [
        detail.OrderId,
        detail.ProductId,
        detail.Quantity,
        detail.PriceAtOrder
      ]);
      await pool.promise().query(query, [values]);
    } catch (error) {
      console.error('Error creating order details:', error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const query = 'SELECT * FROM Orders WHERE OrderId = ?';
      const [order] = await pool.promise().query(query, [orderId]);
      return order[0];
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(orderId, updatedOrderData) {
    try {
      const query = 'UPDATE Orders SET ? WHERE OrderId = ?';
      const [result] = await pool.promise().query(query, [updatedOrderData, orderId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const query = 'DELETE FROM Orders WHERE OrderId = ?';
      const [result] = await pool.promise().query(query, [orderId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Order();