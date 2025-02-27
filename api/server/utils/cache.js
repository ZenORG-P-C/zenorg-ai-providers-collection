import { config } from '../config.js';

class ProvidersCache {
  constructor() {
    this.cache = null;
    this.lastUpdate = 0;
  }

  isValid() {
    if (!this.cache) return false;
    const now = Date.now();
    return (now - this.lastUpdate) < config.cache.ttl;
  }

  get() {
    if (this.isValid()) {
      return this.cache;
    }
    return null;
  }

  set(providers) {
    this.cache = providers;
    this.lastUpdate = Date.now();
  }

  invalidate() {
    this.cache = null;
    this.lastUpdate = 0;
  }
}

// Export singleton instance
export const providersCache = new ProvidersCache();