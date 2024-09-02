const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');
const ProductController = require("../controllers/productController.js");


const productManager = new ProductManager();
const productController = new ProductController();

router.get('/', async (req, res) => {
    const p = await productController.getAllProducts(req, res);
});

router.get('/products', async (req, res) => {
    await productController.getAllProducts(req, res);
});

module.exports = router;