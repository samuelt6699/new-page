const CartItem = require("../models/cartItem");

exports.createCart = async (req, res) => {
  try {
    const { ProductId, Quantity } = req.body;

    const ClientId = req.user.clientId;
    console.log(req.user)

    if (!ProductId || !Quantity) {
      return res.status(400).json({
        message:
          "Missing required fields: ProductId, and Quantity must be provided",
      });
    }

    const cartItem = {
      ClientId,
      ProductId,
      Quantity,
    };

    const cartId = await CartItem.create(cartItem);

    res.status(201).json({ message: "Cart item added successfully", cartId });
  } catch (error) {
    console.error("Failed to create cart: ", error);
    res.status(500).json({
      message: "Error adding cart item",
      error: error.message,
      detail: error.detail,
    });
  }
};

// GET /cart-items
exports.getAll = async (req, res) => {
  if (!req.user || !req.user.clientId) {
    return res
      .status(401)
      .json({ message: "Unauthorized, no client information." });
  }

  const clientId = req.user.clientId;
  try {
    const cartItems = await CartItem.getAll(clientId);
    res.status(200).json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart items", error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const updateData = req.body;
    const updateResult = await CartItem.updateById(cartItemId, updateData);
    if (updateResult) {
      res.status(200).json({ message: "Cart item updated successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" }); // Fixed error message
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error: error.message });
  }
};

exports.deleteItem = async (req, res) => { // Updated function name for consistency
  try {
    const { cartItemId } = req.params;
    const deleteResult = await CartItem.deleteById(cartItemId);
    if (deleteResult) {
      res.status(200).json({ message: "Cart item deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item", error: error.message });
  }
};
/*
    // GET /cart-items/:id
    async getCartItemById(req, res) {
        try {
            const { id } = req.params;
            const cartItem = await CartItem.findById(id);
            if (cartItem) {
                res.status(200).json(cartItem);
            } else {
                res.status(404).json({ message: 'Cart item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cart item', error: error.message });
        }
    }

    // PUT /cart-items/:id
    
    
}

module.exports = new CartItemController();
*/
