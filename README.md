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

## API Usage

The repository includes a simple API server that provides access to the provider data:

```bash
# Get all providers
curl http://localhost:3000/api/providers

# Get OpenAI-compatible providers
curl http://localhost:3000/api/providers?type=openai-compatible

# Get providers with specific features
curl http://localhost:3000/api/providers?features=embeddings
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

# Run tests
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
