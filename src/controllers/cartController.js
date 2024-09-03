const CartManager = require("../managers/cartManager");
const cartManager = new CartManager();

class CartController {

    getAllCarts = async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message_error: error.message, success: false });
    }
    };

    getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        if (cart) {
            console.log(cart)
            res.render("products/cart", { 
                cart
            });
        } else {
            res.status(404).json({ message_error: "Carrito no encontrado", success: false });
        }
    } catch (error) {
        res.status(500).json({ message_error: error.message, success: false });
    }
    };

    createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart(req.body);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message_error: error.message, success: false });
    }
    };

    updateCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const updatedCart = await cartManager.updateCartById(cid, req.body);
        if (updatedCart) {
        res.json(updatedCart);
        } else {
        res.status(404).json({ message_error: "Carrito no encontrado", success: false });
        }
    } catch (error) {
        res.status(500).json({ message_error: error.message, success: false });
    }
    };

    updateProductQuantityByCartId = async (req, res) => {
        try {
        const { cid, pid } = req.params;
        const updatedCart = await cartManager.updateProductQuantityByCartId(cid, pid, req.body);
        if (updatedCart) {
            res.json(updatedCart);
        } else {
            res.status(404).json({ message_error: "Carrito no encontrado", success: false });
        }
        } catch (error) {
        res.status(500).json({ message_error: error.message, success: false });
        }
    };

    deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid, quantity = 1 } = req.params;
        const cart = await cartManager.deleteProductFromCart(cid, pid, quantity);
        if (cart) {
        res.json(cart);
        } else {
        res.status(404).json({ message_error: "Carrito o producto no encontrado", success: false });
        }
    } catch (error) {
        res.status(500).json({ message_error: error.message, success: false });
    }
    };

    deleteCart = async (req, res) => {
        try {
        const { cid } = req.params;
        const cart = await cartManager.deleteCart(cid);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message_error: "Carrito o producto no encontrado", success: false });
        }
        } catch (error) {
        res.status(500).json({ message_error: error.message, success: false });
        }
    };
}

module.exports = CartController;