import React, { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageWrapper = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  const validLanguages = ['en', 'ka', 'ru'];

  // Check if language is valid
  if (!validLanguages.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  // Sync i18n with URL language
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <Outlet />;
};

export default LanguageWrapper;
