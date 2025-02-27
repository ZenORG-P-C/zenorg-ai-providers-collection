import { validateUrl, normalizeUrl } from './utils/url-utils.js';
import { fetchContent, parseHtml } from './utils/content-utils.js';
import { extractBasicInfo } from './extractors/basic-info.js';
import { extractEndpoints, extractFromApiDocs } from './extractors/endpoints.js';
import { extractFeatures, detectOpenAICompatibility } from './extractors/features.js';
import { extractAuthentication, extractFromAuthDocs } from './extractors/authentication.js';

export class ProviderScraper {
  constructor() {
    this.results = {
      id: '',
      name: '',
      description: '',
      type: [],
      endpoints: {
        base_url: ''
      },
      authentication: {
        type: 'api_key',
        header: ''
      },
      features: [],
      pricing: {
        free_tier: false
      },
      documentation_url: '',
      status: 'active'
    };
    
    this.confidence = {
      name: false,
      description: false,
      type: false,
      endpoints: false,
      authentication: false,
      features: false,
      pricing: false,
      status: false
    };
  }

  async scrape(mainUrl, additionalUrls = {}) {
    try {
      console.log('Starting scrape for URL:', mainUrl);
      
      if (!validateUrl(mainUrl)) {
        throw new Error('Invalid main documentation URL');
      }

      // Store documentation URL
      this.results.documentation_url = normalizeUrl(mainUrl);
      console.log('Normalized URL:', this.results.documentation_url);

      // Scrape main documentation
      console.log('Fetching main content...');
      const mainContent = await fetchContent(mainUrl);
      console.log('Parsing main content...');
      const $ = parseHtml(mainContent);
      console.log('Processing main content...');
      await this.processMainContent($);

      // Process additional URLs if provided
      for (const [type, url] of Object.entries(additionalUrls)) {
        if (!url || !validateUrl(url)) continue;
        
        console.log(`Fetching ${type} content from:`, url);
        const content = await fetchContent(url);
        const $additional = parseHtml(content);
        await this.processAdditionalContent($additional, type);
      }

      // Generate ID from name
      if (this.results.name) {
        this.results.id = this.results.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }

      console.log('Scraping completed successfully');
      console.log('Results:', this.results);
      console.log('Confidence:', this.confidence);

      return {
        provider: this.results,
        confidence: this.confidence
      };
    } catch (error) {
      console.error('Scraping failed:', error);
      throw new Error(`Scraping failed: ${error.message}`);
    }
  }

  async processMainContent($) {
    console.log('Extracting basic info...');
    // Extract basic information
    const basicInfo = extractBasicInfo($);
    Object.assign(this.results, basicInfo);
    Object.assign(this.confidence, basicInfo.confidence);

    console.log('Extracting endpoints...');
    // Extract endpoints
    const endpointInfo = extractEndpoints($);
    this.results.endpoints = {
      ...this.results.endpoints,
      ...endpointInfo.endpoints
    };
    this.confidence.endpoints = endpointInfo.confidence.endpoints;

    console.log('Extracting features...');
    // Extract features and type
    const featureInfo = extractFeatures($);
    this.results.features = featureInfo.features;
    this.confidence.features = featureInfo.confidence.features;
    this.results.type = detectOpenAICompatibility($);
    this.confidence.type = true;

    console.log('Extracting authentication...');
    // Extract authentication
    const authInfo = extractAuthentication($);
    this.results.authentication = authInfo.authentication;
    this.confidence.authentication = authInfo.confidence.authentication;
  }

  async processAdditionalContent($, type) {
    console.log(`Processing ${type} content...`);
    switch (type) {
      case 'api':
        const endpoints = extractFromApiDocs($);
        this.results.endpoints = {
          ...this.results.endpoints,
          ...endpoints
        };
        break;

      case 'authentication':
        const authInfo = extractFromAuthDocs($);
        this.results.authentication = {
          ...this.results.authentication,
          ...authInfo
        };
        break;

      case 'pricing':
        const bodyText = $('body').text().toLowerCase();
        if (bodyText.includes('free tier') || 
            bodyText.includes('free credits') || 
            bodyText.includes('free trial')) {
          this.results.pricing.free_tier = true;
        }
        this.results.pricing.details_url = $('link[rel="canonical"]').attr('href');
        break;
    }
  }
}