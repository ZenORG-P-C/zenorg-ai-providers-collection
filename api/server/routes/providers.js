import express from 'express';
import { ProviderService } from '../services/provider-service.js';

const router = express.Router();

// Get all providers with optional filtering
router.get('/', async (req, res, next) => {
  try {
    const { type, features } = req.query;
    const providers = await ProviderService.filterProviders(type, features);

    res.json({
      count: providers.length,
      providers
    });
  } catch (error) {
    next(error);
  }
});

// Get provider by ID
router.get('/:id', async (req, res, next) => {
  try {
    const provider = await ProviderService.getProvider(req.params.id);
    res.json(provider);
  } catch (error) {
    next(error);
  }
});

// Save new provider
router.post('/', async (req, res, next) => {
  try {
    const provider = await ProviderService.saveProvider(req.body);
    res.status(201).json({
      message: 'Provider saved successfully',
      provider
    });
  } catch (error) {
    next(error);
  }
});

export default router;