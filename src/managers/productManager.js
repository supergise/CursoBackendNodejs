const Product = require("../models/product.model");
class ProductManager {
    async getAllProducts() {
      return await Product.find({}, "title description price code stock category");
    }
  
    async getProductById(id) {
      return await Product.findById(id);
    }
  
    async createProduct(data) {
      const product = new Product(data);
      return await product.save();
    }
  
    async updateProductById(id, updatedData) {
      return await Product.findByIdAndUpdate(id, updatedData, { new: true });
    }
  
    async deleteProductById(id) {
      return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManager;






//TO DO  Actualizar en las routes los nombres de las funciones

/* class ProductManager {
    constructor() {
        this.init();
    }

    async init() {
        try {
            await fs.access(productsFilePath);
            const products = await this.getAll();
            if (!Array.isArray(products)) {
                await this.saveAll([]);
            }
        } catch (error) {
            await this.saveAll([]);
        }
    }

    async saveAll(products) {
        await fs.writeFile(productsFilePath, JSON.stringify(products));
    }

    async getAll(limit = null) {
        const products = JSON.parse(await fs.readFile(productsFilePath, 'utf8'));
        return limit ? products.slice(0, limit) : products;
    }

    async getById(id) {
        const products = await this.getAll();
        return products.find(product => product.id === id);
    }

    async add(product) {
        const products = await this.getAll();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        await this.saveAll(products);
    }

    async updateById(id, updatedProduct) {
        const products = await this.getAll();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct, id };
            await this.saveAll(products);
        }
    }

    async deleteById(id) {
        const products = await this.getAll();
        const filteredProducts = products.filter(product => product.id !== id);
        await this.saveAll(filteredProducts);
    }
} */