import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface TranslatedTextProps {
  text: string;
  className?: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ text, className }) => {
  const translatedText = useTranslation(text);
  
  return <span className={className}>{translatedText}</span>;
};