# AI Provider Collection Guide

This guide outlines the process for collecting and documenting AI providers in a standardized format.

## Required Information

For each AI provider, we need to collect the following information:

### Basic Information
- `id`: Lowercase alphanumeric with hyphens (e.g., "anthropic", "google-palm")
- `name`: Official display name
- `description`: Brief description of services (1-2 sentences)
- `type`: Array of ["openai-compatible" and/or "standalone"]

### API Details
- `endpoints`:
  - `base_url`: Main API endpoint
  - `completions`: Path for text completions (if available)
  - `chat`: Path for chat completions (if available)
  - `embeddings`: Path for embeddings (if available)

### Authentication
- `authentication`:
  - `type`: One of ["api_key", "oauth2", "basic"]
  - `header`: HTTP header used (e.g., "Authorization")

### Features
Available features from:
- text-generation
- chat
- embeddings
- fine-tuning
- image-generation
- audio-transcription
- audio-generation

### Additional Information
- `pricing`:
  - `free_tier`: Boolean indicating free tier availability
  - `details_url`: URL to pricing page
- `documentation_url`: URL to API documentation
- `status`: One of ["active", "beta", "deprecated"]

## Collection Process

1. **Initial Research**
   - Visit provider's website
   - Review API documentation
   - Check pricing information
   - Test API endpoints if possible

2. **Documentation**
   - Create a new directory under `providers/[provider-id]/`
   - Create `[provider-id].json` following the schema
   - Validate against schema/provider.json

3. **Verification Checklist**
   - [ ] All required fields are present
   - [ ] URLs are valid and accessible
   - [ ] Endpoints are correctly formatted
   - [ ] Features list is accurate
   - [ ] Status is current
   - [ ] Schema validation passes

## Example Structure

```json
{
  "id": "example-provider",
  "name": "Example Provider",
  "description": "Brief description of the provider's capabilities.",
  "type": ["openai-compatible"],
  "endpoints": {
    "base_url": "https://api.example.com",
    "completions": "/v1/completions",
    "chat": "/v1/chat/completions",
    "embeddings": "/v1/embeddings"
  },
  "authentication": {
    "type": "api_key",
    "header": "Authorization"
  },
  "features": [
    "text-generation",
    "chat"
  ],
  "pricing": {
    "free_tier": true,
    "details_url": "https://example.com/pricing"
  },
  "documentation_url": "https://example.com/docs",
  "status": "active"
}
```

## Common Providers to Consider

1. Anthropic (Claude)
2. Google PaLM
3. Cohere
4. AI21 Labs
5. Hugging Face
6. Azure OpenAI
7. Amazon Bedrock
8. Mistral AI
9. Ollama
10. Together AI

## Contribution Process

1. Research provider thoroughly
2. Create provider JSON file
3. Validate against schema
4. Submit for review
5. Address any feedback
6. Merge into collection

Remember to:
- Keep descriptions concise and factual
- Verify all URLs work
- Double-check endpoint paths
- Ensure feature list is current
- Update status if known issues exist