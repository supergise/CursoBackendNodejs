const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/productController.js");
const CartController = require("../controllers/cartController.js");

const productController = new ProductController();
const cartController = new CartController();

router.get('/', async (req, res) => {
    const p = await productController.getAllProducts(req, res);
});

router.get('/products', async (req, res) => {
    await productController.getAllProducts(req, res);
});

router.get('/carts/:cid', async (req, res) => {
    await cartController.getCartById(req, res);
});

module.exports = router;