import React, { useState, useEffect, createContext, useContext } from 'react';
import { translate } from '@vitalets/google-translate-api-browser';

const LanguageContext = createContext();

const indianLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'or', name: 'Odia' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' }
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

const TranslateText = ({ children }) => {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    const translateText = async () => {
      if (language === 'en') {
        setTranslatedText(children);
        return;
      }

      try {
        const result = await translate(children, { to: language });
        setTranslatedText(result.text);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText(children); // Fallback to original text
      }
    };

    translateText();
  }, [children, language]);

  return <span>{translatedText}</span>;
};

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {indianLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

const Translatew = () => {
  return (
    <LanguageProvider>
      <div className="p-4">
        <LanguageSelector />
        <h1 className="text-2xl font-bold mt-4">
          <TranslateText>About Us</TranslateText>
        </h1>
        <p className="mt-2">
          <TranslateText>
            Our platform is dedicated to eliminating middlemen in the agricultural supply chain. 
            By connecting farmers directly with consumers, we ensure that farmers receive a fair 
            price for their produce while consumers enjoy fresh and affordable products.
          </TranslateText>
        </p>
        <p className="mt-2">
          <TranslateText>
            We are committed to empowering farmers and creating a more transparent, 
            efficient, and equitable marketplace.
          </TranslateText>
        </p>
      </div>
    </LanguageProvider>
  );
};

export default Translatew;