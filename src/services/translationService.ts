import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('your_gemini_key');

const languageMap = {
  hi: 'Hindi',
  mr: 'Marathi',
  gu: 'Gujarati',
  bn: 'Bengali',
  te: 'Telugu',
  ta: 'Tamil',
  kn: 'Kannada',
  ml: 'Malayalam'
};

export const translateText = async (text: string, targetLanguage: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const languageName = languageMap[targetLanguage] || targetLanguage;

    const prompt = `
      Translate the following text to ${languageName}.
      Maintain the original meaning and context while ensuring it's natural and culturally appropriate.
      Only return the translated text, nothing else.
      
      Text to translate:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text on error
  }
};

export const translateContent = async (content: any, targetLanguage: string): Promise<any> => {
  if (typeof content === 'string') {
    return await translateText(content, targetLanguage);
  }

  if (Array.isArray(content)) {
    return Promise.all(content.map(item => translateContent(item, targetLanguage)));
  }

  if (typeof content === 'object' && content !== null) {
    const translatedObj: any = {};
    for (const key in content) {
      if (typeof content[key] === 'string') {
        translatedObj[key] = await translateText(content[key], targetLanguage);
      } else {
        translatedObj[key] = await translateContent(content[key], targetLanguage);
      }
    }
    return translatedObj;
  }

  return content;
};