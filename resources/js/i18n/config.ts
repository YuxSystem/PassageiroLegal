import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';

// Get initial language from localStorage or default to pt-BR
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('i18nextLng');
    if (stored && ['pt-BR', 'en'].includes(stored)) {
      return stored;
    }
    // Try to detect from browser
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang?.startsWith('pt')) {
      return 'pt-BR';
    }
    if (browserLang?.startsWith('en')) {
      return 'en';
    }
  }
  return 'pt-BR';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': {
        translation: ptBR,
      },
      'en': {
        translation: en,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'pt-BR',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;

