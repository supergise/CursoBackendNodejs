const ProductManager = require("../managers/productManager");
const productManager = new ProductManager();

class ProductController {
    getAllProducts = async (req, res) => {
        try {
            const { page = 1, limit = 10, sort = 'desc', search = '' } = req.query;
            const sortOrder = sort === 'asc' ? 1 : -1;
    
            const searchFilter = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ]
            };
    
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: { price: sortOrder },
            };
    
            const result = await productManager.getAllPage(searchFilter, options);
    
            res.render("products/index", { 
                products: result.docs,
                currentPage: result.page,
                totalPages: result.totalPages,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                sort,
                limit,
                search,
            });
        } catch (error) {
            res.status(500).json({
                message_error: error.message,
                success: false,
            });
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
