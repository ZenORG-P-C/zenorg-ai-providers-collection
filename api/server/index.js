import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { errorHandler } from './middleware/error-handler.js';
import routes from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Serve static files from public directory
app.use(express.static(join(__dirname, 'public')));

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
    console.log(`Try: curl http://localhost:${config.port}/api/providers`);
  });
}

export default app;