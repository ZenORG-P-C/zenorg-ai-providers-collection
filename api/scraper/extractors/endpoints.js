/**
 * Extracts API endpoint information from HTML content
 */
export function extractEndpoints($) {
  const bodyText = $('body').text();
  
  // Look for API base URL patterns
  const baseUrlPattern = bodyText.match(
    /https:\/\/api\.[a-zA-Z0-9-]+\.[a-zA-Z0-9]+/
  );

  const endpoints = {
    base_url: baseUrlPattern ? baseUrlPattern[0] : ''
  };

  // Look for specific endpoint paths
  const completionsPath = bodyText.match(/\/v\d+\/completions/);
  if (completionsPath) {
    endpoints.completions = completionsPath[0];
  }

  const chatPath = bodyText.match(/\/v\d+\/chat\/completions/);
  if (chatPath) {
    endpoints.chat = chatPath[0];
  }

  const embeddingsPath = bodyText.match(/\/v\d+\/embeddings/);
  if (embeddingsPath) {
    endpoints.embeddings = embeddingsPath[0];
  }

  return {
    endpoints,
    confidence: {
      endpoints: !!baseUrlPattern
    }
  };
}

export function extractFromApiDocs($) {
  const bodyText = $('body').text();
  const endpoints = {};

  // Look for endpoint paths in API documentation
  const completionsPath = bodyText.match(/\/v\d+\/completions/);
  if (completionsPath) {
    endpoints.completions = completionsPath[0];
  }

  const chatPath = bodyText.match(/\/v\d+\/chat\/completions/);
  if (chatPath) {
    endpoints.chat = chatPath[0];
  }

  const embeddingsPath = bodyText.match(/\/v\d+\/embeddings/);
  if (embeddingsPath) {
    endpoints.embeddings = embeddingsPath[0];
  }

  return endpoints;
}