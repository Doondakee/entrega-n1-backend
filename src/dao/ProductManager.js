import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class ProductManager {
  constructor() {
      this.path = join(__dirname, '../products.json'); // Ruta absoluta
      this.products = [];
      this.loadProducts(); // ← Verifica que no lance error aquí
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
      await this.saveProducts();
    }
  }

  async saveProducts() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );
  }

  async addProduct(productData) {
    const { title, description, code, price, status, stock, category, thumbnails } = productData;

    // Validación de campos obligatorios
    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error('Todos los campos son obligatorios excepto thumbnails');
    }

    // Validación de código único
    if (this.products.some(product => product.code === code)) {
      throw new Error('El código del producto ya existe');
    }

    const newProduct = {
      id: uuidv4(),
      title,
      description,
      code,
      price: Number(price),
      status: status !== undefined ? status : true,
      stock: Number(stock),
      category,
      thumbnails: thumbnails || []
    };

    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  async getProducts() {
    await this.loadProducts();
    return this.products;
  }

  async getProductById(id) {
    await this.loadProducts();
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    await this.loadProducts();
    const productIndex = this.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    // Evitar actualización del ID
    if (updatedFields.id) {
      delete updatedFields.id;
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields
    };

    await this.saveProducts();
    return this.products[productIndex];
  }

  async deleteProduct(id) {
    await this.loadProducts();
    const productIndex = this.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    await this.saveProducts();
    return deletedProduct;
  }
}