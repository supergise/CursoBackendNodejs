const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const p = await productManager.getAllProducts();
    console.log(p);
    res.render('home', { products: p});
});

router.get('/products', async (req, res) => {
    res.render('realTimeProducts', { products: await productManager.getAllProducts()});
});

module.exports = router;