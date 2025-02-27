# AI Providers Collection

A comprehensive collection of AI providers, including OpenAI-compatible endpoints and standalone services. This repository serves as a central hub for discovering and comparing different AI service providers.

## Structure

```
.
├── providers/           # JSON files containing provider information
│   ├── openai/         # OpenAI-compatible providers
│   └── standalone/     # Standalone AI providers
├── schema/             # JSON schemas for provider data
├── api/                # API implementation
└── docs/              # Additional documentation
```

## Provider Data Format

Each provider is documented in a JSON file with the following structure:

```json
{
  "id": "unique-provider-id",
  "name": "Provider Name",
  "description": "Brief description of the provider",
  "type": ["openai-compatible", "standalone"],
  "endpoints": {
    "base_url": "https://api.provider.com",
    "completions": "/v1/completions",
    "chat": "/v1/chat/completions"
  },
  "authentication": {
    "type": "api_key",
    "header": "Authorization"
  },
  "features": [
    "text-generation",
    "embeddings",
    "fine-tuning"
  ],
  "pricing": {
    "free_tier": true,
    "details_url": "https://provider.com/pricing"
  },
  "documentation_url": "https://docs.provider.com",
  "status": "active"
}
```

## API Endpoints

### Provider Management

```bash
# Get all providers
GET /api/providers

# Get providers with filters
GET /api/providers?type=openai-compatible
GET /api/providers?features=embeddings

# Get specific provider by ID
GET /api/providers/:id

# Add new provider
POST /api/providers
Content-Type: application/json

{
  "id": "provider-id",
  "name": "Provider Name",
  ...
}
```

### Provider Scraping

```bash
# Scrape provider from documentation
POST /api/scrape
Content-Type: application/json

{
  "mainUrl": "https://docs.provider.com",
  "additionalUrls": {
    "api": "https://docs.provider.com/api",
    "authentication": "https://docs.provider.com/auth",
    "pricing": "https://docs.provider.com/pricing"
  }
}

# Response includes confidence levels for extracted data
{
  "message": "Scraping completed successfully",
  "provider": {
    "id": "provider-id",
    "name": "Provider Name",
    ...
  },
  "confidence": {
    "name": true,
    "description": true,
    "endpoints": true,
    ...
  }
}
```

### Health Check

```bash
# Check API health
GET /api/health

Response: { "status": "ok" }
```

## Contributing

1. Fork the repository
2. Add or update provider information in the appropriate directory
3. Ensure your JSON follows the schema
4. Submit a pull request

## Development

```bash
# Install dependencies
npm install

# Start the API server
npm start

# Run in development mode with auto-reload
npm run dev

# Run tests
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
