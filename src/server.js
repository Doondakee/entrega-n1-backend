import { SERVER_CONFIG } from './config/server.config.js';
import app from './app.js';

const server = app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server running on port ${SERVER_CONFIG.PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});