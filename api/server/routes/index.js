import express from 'express';
import providersRouter from './providers.js';
import scrapingRouter from './scraping.js';

const router = express.Router();

// Mount route handlers
router.use('/providers', providersRouter);
router.use('/scrape', scrapingRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;