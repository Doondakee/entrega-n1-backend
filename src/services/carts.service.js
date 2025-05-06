import { CartManager } from '../dao/CartManager.js';

const cartManager = new CartManager();

export class CartsService {
  static async createCart() {
    return await cartManager.createCart();
  }

  static async getCartById(id) {
    return await cartManager.getCartById(id);
  }

  static async addProductToCart(cartId, productId) {
    return await cartManager.addProductToCart(cartId, productId);
  }
}