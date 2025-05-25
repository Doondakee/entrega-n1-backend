import express from 'express';
import { engine } from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SERVER_CONFIG } from './config/server.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { viewsRouter } from './routes/views.router.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views')); // Ruta absoluta

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(SERVER_CONFIG.PUBLIC_DIR));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter(io)); // Pasamos io al router de vistas

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

export { httpServer, io };