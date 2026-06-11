'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary } from '../translations/dictionary';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  // Sync with localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('language');
      if (stored === 'ha' || stored === 'en') {
        setLanguage(stored);
      }
    } catch (e) {}
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ha' : 'en';
    setLanguage(newLang);
    try {
      localStorage.setItem('language', newLang);
    } catch (e) {}
  };

  const t = (key) => {
    const langDict = dictionary[language];
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    const defaultDict = dictionary['en'];
    if (defaultDict && defaultDict[key] !== undefined) {
      return defaultDict[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
