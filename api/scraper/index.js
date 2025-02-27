import { ProviderScraper } from './provider-scraper.js';

export { ProviderScraper };

// Factory function to create a new scraper instance
export function createScraper() {
  return new ProviderScraper();
}

// Convenience function to scrape a provider
export async function scrapeProvider(mainUrl, additionalUrls = {}) {
  const scraper = new ProviderScraper();
  return scraper.scrape(mainUrl, additionalUrls);
}