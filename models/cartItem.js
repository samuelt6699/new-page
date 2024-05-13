const { connection } = require('../config/data');

class CartItem {
  // To add a new cart item
  async create(cartData) {
    if (!cartData.ClientId) {
      throw new Error("ClientId must be provided");
    }
    if (!cartData.ProductId) {
      throw new Error("ProductId must be provided");
    }
    if (!cartData.Quantity) {
      throw new Error("Quantity must be provided");
    }

    // Insert the new cart item into the database
    const [result] = await connection.promise().query(
      'INSERT INTO CartItems (ClientId, ProductId, Quantity) VALUES (?, ?, ?)',
      [cartData.ClientId, cartData.ProductId, cartData.Quantity]
    );
    
    return result.insertId;
  }

  // To get all cart items for a client
  async getAll(clientId) {
    const [result] = await connection.promise().query(
      'SELECT * FROM CartItems WHERE ClientId = ?',
      [clientId]
    );
    return result;
  }

  // To find a cart item by ID
  async findById(cartId) {
    const [rows] = await connection.promise().query(
      'SELECT * FROM CartItems WHERE CartId = ? LIMIT 1',
      [cartId]
    );
    return rows[0] || null;
  }

  // To update a cart item by ID
  async updateById(cartItemId, updateData) {
    const [result] = await connection.promise().query(
      'UPDATE CartItems SET ? WHERE CartItemId = ?',
      [updateData, cartItemId]
    );
    return result.affectedRows;
  }

  // To delete a cart item by ID
  async deleteById(cartItemId) {
    const [result] = await connection.promise().query(
      'DELETE FROM CartItems WHERE CartItemId = ?',
      [cartItemId]
    );
    return result.affectedRows;
  }
}

module.exports = new CartItem();