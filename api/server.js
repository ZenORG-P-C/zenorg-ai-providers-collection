import express from 'express';
import cors from 'cors';
import { glob } from 'glob';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROVIDERS_DIR = join(__dirname, '..', 'providers');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cache providers in memory
let providersCache = null;
let lastCacheUpdate = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function loadProviders() {
  const now = Date.now();
  if (providersCache && (now - lastCacheUpdate) < CACHE_TTL) {
    return providersCache;
  }

  try {
    const files = await glob('**/*.json', { cwd: PROVIDERS_DIR });
    const providers = await Promise.all(
      files.map(async (file) => {
        const content = await readFile(join(PROVIDERS_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
    );
    
    providersCache = providers;
    lastCacheUpdate = now;
    return providers;
  } catch (error) {
    console.error('Error loading providers:', error);
    throw new Error('Failed to load providers');
  }
}

// Routes
app.get('/api/providers', async (req, res) => {
  try {
    const { type, features } = req.query;
    let providers = await loadProviders();

    // Filter by type if specified
    if (type) {
      providers = providers.filter(provider => 
        provider.type.includes(type)
      );
    }

    // Filter by features if specified
    if (features) {
      const requiredFeatures = Array.isArray(features) ? features : [features];
      providers = providers.filter(provider =>
        requiredFeatures.every(feature => 
          provider.features.includes(feature)
        )
      );
    }

    res.json({
      count: providers.length,
      providers
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Get provider by ID
app.get('/api/providers/:id', async (req, res) => {
  try {
    const providers = await loadProviders();
    const provider = providers.find(p => p.id === req.params.id);
    
    if (!provider) {
      return res.status(404).json({
        error: 'Not found',
        message: `Provider with ID '${req.params.id}' not found`
      });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Try: curl http://localhost:${port}/api/providers`);
});

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});