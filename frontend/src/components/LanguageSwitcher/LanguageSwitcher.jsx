import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ka', label: 'GE' },
    { code: 'ru', label: 'RU' }
  ];

  const currentLang = lang || i18n.language || 'en';
  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  const changeLanguage = (newLang) => {
    // Get current path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/(en|ka|ru)/, '');

    // Build new path with new language
    const newPath = `/${newLang}${pathWithoutLang}`;

    // Full page reload to new URL
    window.location.href = newPath;
  };

  return (
    <div className="language-switcher">
      <button
        className="language-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="lang-label">{currentLanguage.label}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${lang.code === currentLang ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="lang-label">{lang.label}</span>
              {lang.code === currentLang && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
