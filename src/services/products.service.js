import { ProductManager } from '../dao/ProductManager.js';
import { io } from '../app.js';

const productManager = new ProductManager();

export class ProductsService {
  static async getProducts() {
    return await productManager.getProducts();
  }

  static async getProducts() {
  console.log('Accediendo a getProducts()');
  try {
    const products = await productManager.getProducts();
    console.log(`Productos obtenidos: ${products.length}`);
    return products;
  } catch (error) {
    console.error('Error en getProducts:', error);
    throw error;
  }
}

  static async addProduct(productData) {
    const newProduct = await productManager.addProduct(productData);
    return newProduct;
  }

  static async updateProduct(id, updatedFields) {
    return await productManager.updateProduct(id, updatedFields);
  }

  static async deleteProduct(id) {
    const deletedProduct = await productManager.deleteProduct(id);
    return deletedProduct;
  }
}