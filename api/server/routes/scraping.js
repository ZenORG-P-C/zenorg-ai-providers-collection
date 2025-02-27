import express from 'express';
import { scrapeProvider } from '../../scraper/index.js';
import { ValidationError } from '../middleware/error-handler.js';

const router = express.Router();

// Scrape provider from documentation
router.post('/', async (req, res, next) => {
  try {
    const { mainUrl, additionalUrls } = req.body;

    if (!mainUrl) {
      throw new ValidationError('Main documentation URL is required');
    }

    const result = await scrapeProvider(mainUrl, additionalUrls);

    res.json({
      message: 'Scraping completed successfully',
      ...result
    });
  } catch (error) {
    next(error);
  }
});

export default router;