const express = require('express');
const CartManager = require('../managers/cartManager');
const router = express.Router();

const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    const cart = { products: [] };
    await cartManager.add(cart);
    res.status(201).json(cart);
});

// Listar los productos del carrito
router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(+req.params.cid);
    cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cart = await cartManager.getCartById(+req.params.cid);
    if (cart) {
        const productId = +req.params.pid;
        const productInCart = cart.products.find(p => p.product === productId);
        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        await cartManager.updateCartById(cart.id, cart);
        res.status(201).json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

// Eliminar un producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
    const cartId = +req.params.cid
    const productId = +req.params.pid;
    const cart = await cartManager.deleteProductFromCart(cartId, productId);
    if (cart) {
        res.status(200).json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

module.exports = router;
