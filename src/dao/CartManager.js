import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_CONFIG } from '../config/server.config.js';

export class CartManager {
  constructor() {
    this.path = SERVER_CONFIG.CARTS_FILE;
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
      await this.saveCarts();
    }
  }

  async saveCarts() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.carts, null, 2)
    );
  }

  async createCart() {
    const newCart = {
      id: uuidv4(),
      products: []
    };

    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCartById(id) {
    await this.loadCarts();
    const cart = this.carts.find(c => c.id === id);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return cart;
  }

  async addProductToCart(cartId, productId) {
    await this.loadCarts();
    const cartIndex = this.carts.findIndex(c => c.id === cartId);
    
    if (cartIndex === -1) {
      throw new Error('Carrito no encontrado');
    }

    const cart = this.carts[cartIndex];
    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex === -1) {
      // Producto no existe en el carrito, lo agregamos
      cart.products.push({
        product: productId,
        quantity: 1
      });
    } else {
      // Producto ya existe, incrementamos la cantidad
      cart.products[productIndex].quantity++;
    }

    this.carts[cartIndex] = cart;
    await this.saveCarts();
    return cart;
  }
}