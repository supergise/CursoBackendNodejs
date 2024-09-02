const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
class CartManager {
  async getAllCarts() {
    return await Cart.find().populate("products.product");
  }

  async getCartById(id) {
    return await Cart.findById(id).populate("products.product");
  }

  async createCart(data) {
    const cart = new Cart(data);
    return await cart.save();
  }

  async updateCartById(id, updatedData) {
    return await Cart.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async deleteProductFromCart(cartId, productId, quantity = 1) {
    const cart = await this.getCartById(cartId);
    if (!cart) {
      return null;
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId.toString()
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity -= quantity;
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }
      await cart.save();
    }
    return cart;
  }

  async productExists(productId) {
    return await Product.exists({ _id: productId });
  }
}

module.exports = CartManager;