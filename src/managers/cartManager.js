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

  async updateProductQuantityByCartId(cid, pid, body) {
    const cart = await this.getCartById(cid);
    if (!cart) {
        return null;
    }
    console.log(cart)
    const productIndex = cart.products.findIndex(
        (p) => p._id.toString() === pid.toString()
    );
    console.log(productIndex)
    if (productIndex !== -1) {
        cart.products[productIndex].quantity = body.quantity;
    } else{
        cart.products.push({ _id: pid, product: pid, quantity: body.quantity });
    }
    await cart.save();
    return cart;
  }

  async deleteProductFromCart(cartId, productId, quantity = 1) {
    const cart = await this.getCartById(cartId);
    if (!cart) {
      return null;
    }
    console.log(cart)
    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === productId.toString()
    );
    console.log(productIndex)
    if (productIndex !== -1) {
      cart.products[productIndex].quantity -= quantity;
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }
      await cart.save();
    }
    return cart;
  }

  async deleteCart(cartId) {
    return await Cart.findByIdAndDelete(cartId);
  }

  async productExists(productId) {
    return await Product.exists({ _id: productId });
  }
}

module.exports = CartManager;