import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
  port: process.env.PORT || 3000,
  providersDir: join(__dirname, '..', '..', 'providers'),
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
  },
  cors: {
    origin: '*', // Configure as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
};