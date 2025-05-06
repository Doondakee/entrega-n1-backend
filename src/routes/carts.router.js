import { Router } from 'express';
import { CartsService } from '../services/carts.service.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const newCart = await CartsService.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartsService.getCartById(req.params.cid);
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await CartsService.addProductToCart(
      req.params.cid,
      req.params.pid
    );
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

export default router;