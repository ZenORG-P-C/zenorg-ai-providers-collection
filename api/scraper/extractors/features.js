/**
 * Feature detection keywords and extraction logic
 */
const featureKeywords = {
  'text-generation': ['text generation', 'generate text', 'completions'],
  'chat': ['chat', 'conversation', 'dialogue'],
  'embeddings': ['embeddings', 'vectors', 'encode text'],
  'fine-tuning': ['fine-tuning', 'train', 'customize model'],
  'image-generation': ['image generation', 'create images', 'dall-e'],
  'audio-transcription': ['transcription', 'speech to text', 'audio to text'],
  'audio-generation': ['text to speech', 'generate audio', 'synthesize speech']
};

export function extractFeatures($) {
  const bodyText = $('body').text().toLowerCase();
  const features = [];

  for (const [feature, keywords] of Object.entries(featureKeywords)) {
    if (keywords.some(keyword => bodyText.includes(keyword))) {
      features.push(feature);
    }
  }

  return {
    features,
    confidence: {
      features: features.length > 0
    }
  };
}

export function detectOpenAICompatibility($) {
  const bodyText = $('body').text().toLowerCase();
  
  if (bodyText.includes('openai') || 
      bodyText.includes('gpt') || 
      bodyText.match(/compatible with openai/i)) {
    return ['openai-compatible', 'standalone'];
  }
  
  return ['standalone'];
}