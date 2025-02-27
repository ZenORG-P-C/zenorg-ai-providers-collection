import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * HTML content fetching and processing utilities
 */
export async function fetchContent(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      },
      timeout: 30000,
      maxRedirects: 5
    });
    return response.data;
  } catch (error) {
    console.error('Fetch error:', {
      url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message
    });
    
    if (error.response) {
      throw new Error(`Failed to fetch content: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error(`No response received: ${error.message}`);
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}

export function parseHtml(content) {
  try {
    return cheerio.load(content, {
      normalizeWhitespace: true,
      decodeEntities: true
    });
  } catch (error) {
    console.error('Parse error:', error);
    throw new Error(`Failed to parse HTML content: ${error.message}`);
  }
}

export function extractText($, selector) {
  try {
    return $(selector)
      .text()
      .replace(/\s+/g, ' ')
      .trim();
  } catch {
    return '';
  }
}

export function extractAttribute($, selector, attribute) {
  try {
    return $(selector).attr(attribute) || '';
  } catch {
    return '';
  }
}

export function findInText(text, patterns) {
  if (!text) return null;
  const lowerText = text.toLowerCase();
  
  for (const pattern of patterns) {
    if (typeof pattern === 'string') {
      if (lowerText.includes(pattern.toLowerCase())) {
        return pattern;
      }
    } else if (pattern instanceof RegExp) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }
  }
  
  return null;
}

export function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[\r\n]+/g, ' ')
    .trim();
}