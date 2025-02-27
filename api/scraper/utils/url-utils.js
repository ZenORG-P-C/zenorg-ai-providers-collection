import { URL } from 'url';

/**
 * URL validation and processing utilities
 */
export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function normalizeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    // Remove trailing slashes
    return parsedUrl.href.replace(/\/$/, '');
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}

export function isApiUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.startsWith('api.');
  } catch {
    return false;
  }
}

export function extractBaseApiUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.hostname.split('.');
    
    // If it's already an API URL, return as is
    if (parts[0] === 'api') {
      return `${parsedUrl.protocol}//api.${parts.slice(1).join('.')}`;
    }
    
    // Otherwise, try to construct API URL
    return `${parsedUrl.protocol}//api.${parts.join('.')}`;
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}