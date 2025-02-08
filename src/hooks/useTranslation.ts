import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const useTranslation = (text: string) => {
  const { language, translateDynamic } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translate = async () => {
      if (language !== 'en') {
        const translated = await translateDynamic(text);
        setTranslatedText(translated);
      } else {
        setTranslatedText(text);
      }
    };

    translate();
  }, [text, language, translateDynamic]);

  return translatedText;
};