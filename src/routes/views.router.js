import { Router } from 'express';
import { ProductsService } from '../services/products.service.js';

export const viewsRouter = (io) => {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const products = await ProductsService.getProducts();
      res.render('home', { products });
    } catch (error) {
      res.status(500).render('error', { message: error.message });
    }
  });

  router.get('/realtimeproducts', async (req, res) => {
    try {
      const products = await ProductsService.getProducts();
      res.render('realTimeProducts', { products, useSocket: true });
    } catch (error) {
      console.error('Error en realtimeproducts:', error);
      res.status(500).render('error', { message: error.message });
    }
  });

  return router;
};