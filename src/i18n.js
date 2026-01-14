import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ar', // default language is Arabic
    fallbackLng: 'en', // fallback language is English
    
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;
