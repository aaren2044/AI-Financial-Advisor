import React, { createContext, useContext, useState, useCallback } from 'react';
import { translateContent } from '../services/translationService';
import translations from '../translations';

type Language = 'en' | 'hi' | 'mr' | 'gu' | 'bn' | 'te' | 'ta' | 'kn' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
  translateDynamic: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [currentTranslations, setCurrentTranslations] = useState(translations.en);

  const setLanguage = async (lang: Language) => {
    try {
      setLanguageState(lang);
      
      if (lang === 'en') {
        setCurrentTranslations(translations.en);
      } else if (translations[lang]) {
        setCurrentTranslations(translations[lang]);
      } else {
        // Translate all English content to the target language
        const translatedContent = await translateContent(translations.en, lang);
        setCurrentTranslations(translatedContent);
      }
      
      // Store language preference
      localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
      console.error('Error changing language:', error);
      throw error;
    }
  };

  const translateDynamic = useCallback(async (text: string) => {
    if (language === 'en') return text;
    try {
      return await translateContent(text, language);
    } catch (error) {
      console.error('Dynamic translation error:', error);
      return text;
    }
  }, [language]);

  const t = useCallback((key: string): string => {
    return currentTranslations[key] || translations.en[key] || key;
  }, [currentTranslations]);

  // Initialize language from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateDynamic }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};