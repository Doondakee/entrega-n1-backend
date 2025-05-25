import { SERVER_CONFIG } from './config/server.config.js';
import { httpServer, io } from './app.js';
import { ProductsService } from './services/products.service.js';

// Configuración de Socket.io
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');
  
  // Enviar lista de productos al conectarse
  const products = await ProductsService.getProducts();
  socket.emit('products', products);

  socket.on('addProduct', async (productData) => {
    try {
      const newProduct = await ProductsService.addProduct(productData);
      const products = await ProductsService.getProducts();
      io.emit('products', products);
    } catch (error) {
      socket.emit('error', error.message);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await ProductsService.deleteProduct(productId);
      const products = await ProductsService.getProducts();
      io.emit('products', products);
    } catch (error) {
      socket.emit('error', error.message);
    }
  });
});

httpServer.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server running on port ${SERVER_CONFIG.PORT}`);
});

httpServer.on('error', (error) => {
  console.error('Server error:', error);
});