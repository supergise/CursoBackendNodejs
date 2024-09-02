const ProductManager = require("../managers/productManager");
const productManager = new ProductManager();

class ProductController {
    getAllProducts = async (req, res) => {
        try {
            const products = await productManager.getAllProducts();
            if (res) {
                res.render("products/index", { products });
            } else {
                return products;
            }
        } catch (error) {
            if (res) {
                res.status(500).json({
                    message_error: error.message,
                    success: false,
                });
            }
        }
    };

    showCreateProductForm = (req, res) => {
        res.render("products/create"); // Asegúrate de que este archivo exista en tu carpeta de vistas
    };

    createProduct = async (req, res) => {
        try {
            const imageUrl = `/files/uploads/${req.file.filename}`;
            const {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
            } = req.body;
            const product = {
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category,
                thumbnails: [imageUrl] || [],
            };

            const validationError = this.validateProduct(product);
            if (validationError) {
                return res.status(400).send(validationError);
            }
            
            await productManager.createProduct(product);
            res.redirect('/products');
            return product;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message_error: error.message,
                success: false,
            });
        }
    };

    deleteProductById = async (req, res) => {
        try {
            const { pid } = req.params;
            await productManager.deleteProductById(pid);
        } catch (error) {
            res.status(500).json({
                message_error: error.message,
                success: false,
            });
        }
    };

    getProductById = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productManager.getProductById(pid);
            res.render("products/product", { product });
        } catch (error) {
            res.status(500).json({
                message_error: error.message,
                success: false,
            });
        }
    };

    // Validar campos obligatorios excepto thumbnails
    validateProduct = (product) => {
        const requiredFields = [
            "title",
            "description",
            "code",
            "price",
            "status",
            "stock",
            "category",
        ];
        for (const field of requiredFields) {
            if (!product[field]) {
                return `El campo '${field}' es obligatorio.`;
            }
        }
        return null;
    };
}

module.exports = ProductController;
