const Product = require("../models/product.model");
class ProductManager {
    async getAllProducts() {
      return await Product.find({}, "title description price code stock category");
    }

    async getAllPage(searchFilter, options) {
        return await Product.paginate(searchFilter, options);
    }
  
    async getProductById(id) {
      return await Product.findById(id);
    }
  
    async createProduct(data) {
      const product = new Product(data);
      return await product.save();
    }
  
    async updateProductById(id, updatedData) {
      return await Product.findByIdAndUpdate(id, updatedData, { new: false });
    }
  
    async deleteProductById(id) {
      return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManager;