const express = require("express");
const ProductController = require("../controllers/productController.js");
const router = express.Router();
const upload = require('../middelwares/multerConfig.js');

const productController = new ProductController();

router.get("/form", productController.showCreateProductForm);

// Traer los productos con límite
router.get("/", async (req, res) => {
    const limit = req.query.limit ? +req.query.limit : null;
    const products = await productController.getAllProducts(req, res);
    res.json(products);
});

// Devolver el producto con id
router.get("/:pid", async (req, res) => {
    const product = await productController.getProductById(req, res);

});

// Agregar un nuevo producto
router.post("/", upload.single('image'), async (req, res) => {
    await productController.createProduct(req, res);
});

// Actualizar un producto existente
router.put("/:pid", async (req, res) => {
    const updatedProduct = req.body;
    await productController.updateProductById(+req.params.pid, updatedProduct);
    await emitProducts();
    res.json(updatedProduct);
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
    await productController.deleteProductById(req, res);
    await emitProducts();
    res.status(200).json({ message: "Producto eliminado correctamente" });
});


const emitProducts = async () => {
    const { socketServer } = await import("../app.js");
    const products = await productController.getAllProducts();
    console.log(products);
    socketServer.emit("updateProducts", products);
};

module.exports = router;
