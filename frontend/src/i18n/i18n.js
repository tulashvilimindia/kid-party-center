import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEN from './locales/en/common.json';
import commonKA from './locales/ka/common.json';
import commonRU from './locales/ru/common.json';

import homeEN from './locales/en/home.json';
import homeKA from './locales/ka/home.json';
import homeRU from './locales/ru/home.json';

import packagesEN from './locales/en/packages.json';
import packagesKA from './locales/ka/packages.json';
import packagesRU from './locales/ru/packages.json';

import contactEN from './locales/en/contact.json';
import contactKA from './locales/ka/contact.json';
import contactRU from './locales/ru/contact.json';

import aboutEN from './locales/en/about.json';
import aboutKA from './locales/ka/about.json';
import aboutRU from './locales/ru/about.json';

import faqEN from './locales/en/faq.json';
import faqKA from './locales/ka/faq.json';
import faqRU from './locales/ru/faq.json';

const resources = {
  en: {
    common: commonEN,
    home: homeEN,
    packages: packagesEN,
    contact: contactEN,
    about: aboutEN,
    faq: faqEN
  },
  ka: {
    common: commonKA,
    home: homeKA,
    packages: packagesKA,
    contact: contactKA,
    about: aboutKA,
    faq: faqKA
  },
  ru: {
    common: commonRU,
    home: homeRU,
    packages: packagesRU,
    contact: contactRU,
    about: aboutRU,
    faq: faqRU
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'packages', 'contact', 'about', 'faq'],

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;
