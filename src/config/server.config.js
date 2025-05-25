import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SERVER_CONFIG = {
    PORT: 8080,
    PRODUCTS_FILE: join(__dirname, '../products.json'),
    CARTS_FILE: join(__dirname, '../carts.json'),
    VIEWS_DIR: join(__dirname, '../views'),
    PUBLIC_DIR: join(__dirname, '../public')
};