const fs = require('fs').promises;
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

class CartManager {
    constructor() {
        this.init();
    }

    async init() {
        try {
            await fs.access(cartsFilePath);
            const carts = await this.getAll();
            if (!Array.isArray(carts)) {
                await this.saveAll([]);
            }
        } catch (error) {
            await this.saveAll([]);
        }
    }

    async saveAll(carts) {
        await fs.writeFile(cartsFilePath, JSON.stringify(carts));
    }

    async getAll() {
        return JSON.parse(await fs.readFile(cartsFilePath, 'utf8'));
    }

    async getById(id) {
        const carts = await this.getAll();
        return carts.find(cart => cart.id === id);
    }

    async add(cart) {
        const carts = await this.getAll();
        cart.id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
        carts.push(cart);
        await this.saveAll(carts);
    }

    async updateById(id, updatedCart) {
        const carts = await this.getAll();
        const index = carts.findIndex(cart => cart.id === id);
        if (index !== -1) {
            carts[index] = { ...carts[index], ...updatedCart, id };
            await this.saveAll(carts);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        const cart = await this.getById(cartId);
        if (!cart) {
            return null;
        }

        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity --;
            if (cart.products[productIndex].quantity <= 0) {
                cart.products.splice(productIndex, 1);
            }
            await this.updateById(cartId, cart);
        }
        return cart;
    }

    async productExists(productId) {
        const products = JSON.parse(await fs.readFile(productsFilePath, 'utf8'));
        return products.some(product => product.id === productId);
    }
}

module.exports = CartManager;
