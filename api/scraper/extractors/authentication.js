/**
 * Authentication method detection and extraction
 */
export function extractAuthentication($) {
  const bodyText = $('body').text().toLowerCase();
  let type = 'api_key';
  let header = 'Authorization';
  let confidence = false;

  if (bodyText.includes('api key')) {
    type = 'api_key';
    confidence = true;
  } else if (bodyText.includes('oauth')) {
    type = 'oauth2';
    confidence = true;
  } else if (bodyText.includes('basic auth')) {
    type = 'basic';
    confidence = true;
  }

  return {
    authentication: {
      type,
      header
    },
    confidence: {
      authentication: confidence
    }
  };
}

export function extractFromAuthDocs($) {
  const bodyText = $('body').text().toLowerCase();
  const authInfo = {
    type: 'api_key',
    header: 'Authorization'
  };

  // Look for specific authentication headers
  const headerMatch = bodyText.match(/['"](x-api-key|authorization|bearer)['"]/i);
  if (headerMatch) {
    authInfo.header = headerMatch[1];
  }

  // Determine auth type from context
  if (bodyText.includes('oauth 2.0') || bodyText.includes('oauth2')) {
    authInfo.type = 'oauth2';
  } else if (bodyText.includes('basic authentication') || bodyText.includes('basic auth')) {
    authInfo.type = 'basic';
  }

  return authInfo;
}