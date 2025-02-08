import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = async (langCode: string) => {
    try {
      await setLanguage(langCode as any);
      // Force a page refresh to update all translated content
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 rounded-lg hover:bg-purple-600/30 transition-colors">
        <Globe size={20} className="text-purple-400" />
        <span className="text-white">
          {languages.find(lang => lang.code === language)?.name || 'English'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800/95 backdrop-blur-lg rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-4 py-2 text-left hover:bg-purple-600/20 transition-colors ${
              language === lang.code ? 'bg-purple-600/20 text-purple-400' : 'text-gray-300'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default LanguageSelector;