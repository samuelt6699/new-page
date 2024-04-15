const { knex } = require("../config/database");

class CartItem {
  // To add a new cart item
  async create(cartData) {
    if (!cartData.ClientId ) {
      throw new Error("ClientId, must be provided");
    }
    if ( !cartData.ProductId ) {
      throw new Error(" ProductId,  must be provided");
    }

    if ( !cartData.Quantity) {
      throw new Error("Quantity must be provided");
    }

    // Insert the new cart item into the database
    const result = await knex("CartItems").insert({
      ClientId: cartData.ClientId,
      ProductId: cartData.ProductId,
      Quantity: cartData.Quantity,
    });

    return result;
  }

  async getAll(clientId) {
    const result = await knex("CartItems").select("*").where("ClientId", clientId);
    return result;
}
  // To find a cart item by ID
  async findById(cartId) {
    const result = await knex("CartItems")
      .select("*")
      .where("CartId", cartId)
      .first();
    return result;
  }

  // To update a cart item by ID
  async updateById(cartItemId, updateData) {
    const result = await knex("CartItems")
      .where("CartItemId", cartItemId)
      .update(updateData);
    return result;
  }

  // To delete a cart item by ID
  async deleteById(cartItemId) {
    const result = await knex('CartItems').where('CartItemId', cartItemId).del();
    return result;
  }
}

module.exports = new CartItem();
