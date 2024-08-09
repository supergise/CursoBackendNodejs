const express = require('express');
const router = express.Router();
const ProductManager = require('./../managers/productManager');

const productManager = new ProductManager();

router.get('/bienvenida',(req,res)=> {
    let testUser = {
        name: "Hilda",
        last_name: "Martinez"
    }
    res.render('index', testUser);
});

router.get('/', async (req, res) => {
    res.render('home', { products: await productManager.getAll(null)});
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', { products: await productManager.getAll(null)});
});

module.exports = router;
