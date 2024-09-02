const CartManager = require("../managers/cartManager");
const cartManager = new CartManager();

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message_error: error.message, success: false });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartManager.getCartById(id);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message_error: "Carrito no encontrado", success: false });
    }
  } catch (error) {
    res.status(500).json({ message_error: error.message, success: false });
  }
};

exports.createCart = async (req, res) => {
  try {
    const newCart = await cartManager.createCart(req.body);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message_error: error.message, success: false });
  }
};

exports.updateCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCart = await cartManager.updateCartById(id, req.body);
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ message_error: "Carrito no encontrado", success: false });
    }
  } catch (error) {
    res.status(500).json({ message_error: error.message, success: false });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await cartManager.deleteProductFromCart(cartId, productId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message_error: "Carrito o producto no encontrado", success: false });
    }
  } catch (error) {
    res.status(500).json({ message_error: error.message, success: false });
  }
};
