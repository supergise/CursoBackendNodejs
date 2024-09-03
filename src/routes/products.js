const express = require("express");
const ProductController = require("../controllers/productController.js");
const router = express.Router();
const upload = require('../middelwares/multerConfig.js');

const productController = new ProductController();

router.get("/form", productController.showCreateProductForm);

router.get("/", async (req, res) => {
    const products = await productController.getAllProducts(req, res);
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const product = await productController.getProductById(req, res);
});

router.post("/", upload.single('image'), async (req, res) => {
    await productController.createProduct(req, res);
});

router.put("/:pid", async (req, res) => {
    const updatedProduct = req.body;
    await productController.updateProductById(+req.params.pid, updatedProduct);
    await emitProducts();
    res.json(updatedProduct);
});

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
