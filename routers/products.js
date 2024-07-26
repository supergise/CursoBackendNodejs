const express = require('express');
const ProductManager = require('../managers/productManager');
const router = express.Router();

const productManager = new ProductManager();

// Traer los productos con límite
router.get('/', async (req, res) => {
    const limit = req.query.limit ? +req.query.limit : null;
    const products = await productManager.getAll(limit);
    res.json(products);
});

// Devolver el producto con id 
router.get('/:pid', async (req, res) => {
    const product = await productManager.getById(+req.params.pid);
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const product = { title, description, code, price, status: true, stock, category, thumbnails: thumbnails || [] };

    const validationError = validateProduct(product);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    await productManager.add(product);
    res.status(201).json(product);
});

// Actualizar un producto existente
router.put('/:pid', async (req, res) => {
    const updatedProduct = req.body;
    await productManager.updateById(+req.params.pid, updatedProduct);
    res.json(updatedProduct);
});

// Eliminar un producto
router.delete('/:pid', async (req, res) => {
    await productManager.deleteById(+req.params.pid);
    res.status(200).json({ message: 'Producto  eliminado correctamente' });
});

// Validar campos obligatorios excepto thumbnails 
const validateProduct = (product) => {
    const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category'];
    for (const field of requiredFields) {
        if (!product[field]) {
            return `El campo '${field}' es obligatorio.`;
        }
    }
    return null;
};

module.exports = router;
