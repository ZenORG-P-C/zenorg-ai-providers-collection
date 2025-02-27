/**
 * Extracts basic provider information from HTML content
 */
export function extractBasicInfo($) {
  const name = $('h1').first().text().trim() ||
               $('title').text().trim().split('|')[0].trim();
               
  const description = $('meta[name="description"]').attr('content') ||
                     $('p').first().text().trim();

  const status = detectStatus($('body').text().toLowerCase());

  return {
    name,
    description,
    status,
    confidence: {
      name: !!name,
      description: !!description,
      status: true
    }
  };
}

function detectStatus(bodyText) {
  if (bodyText.includes('beta') || bodyText.includes('preview')) {
    return 'beta';
  } else if (bodyText.includes('deprecated') || bodyText.includes('sunset')) {
    return 'deprecated';
  }
  return 'active';
}