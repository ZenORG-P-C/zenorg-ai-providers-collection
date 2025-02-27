import { glob } from 'glob';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { config } from '../config.js';
import { providersCache } from '../utils/cache.js';
import { ValidationError, NotFoundError } from '../middleware/error-handler.js';

export class ProviderService {
  static async loadProviders() {
    const cached = providersCache.get();
    if (cached) {
      return cached;
    }

    try {
      const files = await glob('**/*.json', { cwd: config.providersDir });
      const providers = await Promise.all(
        files.map(async (file) => {
          const content = await readFile(join(config.providersDir, file), 'utf-8');
          return JSON.parse(content);
        })
      );
      
      providersCache.set(providers);
      return providers;
    } catch (error) {
      console.error('Error loading providers:', error);
      throw new Error('Failed to load providers');
    }
  }

  static async getProvider(id) {
    const providers = await this.loadProviders();
    const provider = providers.find(p => p.id === id);
    
    if (!provider) {
      throw new NotFoundError(`Provider with ID '${id}' not found`);
    }

    return provider;
  }

  static async filterProviders(type, features) {
    let providers = await this.loadProviders();

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

    return providers;
  }

  static async saveProvider(provider) {
    // Basic validation
    if (!provider.id || !provider.name) {
      throw new ValidationError('Provider must have an id and name');
    }

    try {
      // Create provider directory
      const providerDir = join(config.providersDir, provider.id);
      await mkdir(providerDir, { recursive: true });

      // Save provider JSON
      const filePath = join(providerDir, `${provider.id}.json`);
      await writeFile(filePath, JSON.stringify(provider, null, 2));

      // Invalidate cache
      providersCache.invalidate();

      return provider;
    } catch (error) {
      throw new Error(`Failed to save provider: ${error.message}`);
    }
  }
}