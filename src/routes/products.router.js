import { Router } from 'express';
import { ProductsService } from '../services/products.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await ProductsService.getProducts();
    res.json({ status: 'success', payload: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await ProductsService.getProductById(req.params.pid);
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await ProductsService.addProduct(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await ProductsService.updateProduct(
      req.params.pid,
      req.body
    );
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await ProductsService.deleteProduct(req.params.pid);
    res.json({ status: 'success', payload: deletedProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

export default router;