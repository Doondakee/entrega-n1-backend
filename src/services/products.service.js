import { ProductManager } from '../dao/ProductManager.js';

const productManager = new ProductManager();

export class ProductsService {
  static async getProducts() {
    return await productManager.getProducts();
  }

  static async getProductById(id) {
    return await productManager.getProductById(id);
  }

  static async addProduct(productData) {
    return await productManager.addProduct(productData);
  }

  static async updateProduct(id, updatedFields) {
    return await productManager.updateProduct(id, updatedFields);
  }

  static async deleteProduct(id) {
    return await productManager.deleteProduct(id);
  }
}