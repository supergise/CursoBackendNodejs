const express = require('express');
const CartController = require('../controllers/cartController');
const router = express.Router();

const cartController = new CartController();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    const cart = await cartController.createCart(req, res);
    res.status(201).json(cart);
});

// Listar los productos del carrito
router.get('/:cid', async (req, res) => {
    const cart = await cartController.getCartById(req,res);
});

// Agregar un producto al carrito
router.put('/:cid/products/:pid', async (req, res) => {
    cartController.updateProductQuantityByCartId(req, res);
});

router.put('/:cid', async (req, res) => {
    cartController.updateCartById(req, res);
});

router.delete('/:cid', async (req, res) => {
    cartController.deleteCart(req, res);
});

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    cartController.deleteProductFromCart(req, res);
});

module.exports = router;
