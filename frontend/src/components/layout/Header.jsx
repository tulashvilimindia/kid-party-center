import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

const Header = () => {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', labelKey: 'nav.home', emoji: '🏠' },
    { path: '/packages', labelKey: 'nav.packages', emoji: '🎁' },
    { path: '/calculator', labelKey: 'nav.calculator', emoji: '🧮' },
    { path: '/calendar', labelKey: 'nav.calendar', emoji: '📅' },
    { path: '/gallery', labelKey: 'nav.gallery', emoji: '📸' },
    { path: '/about', labelKey: 'nav.about', emoji: 'ℹ️' },
    { path: '/contact', labelKey: 'nav.contact', emoji: '📞' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo wiggle-on-hover">
            <span className="logo-emoji">🎉</span>
            <span className="logo-text">Kid</span>
            <span className="logo-text-accent">Party</span>
            <span className="logo-emoji">🎈</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.emoji} {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Book Now Button */}
          <Link to="/contact" className="btn btn-primary btn-book">
            🎊 {t('buttons.bookNow')}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-mobile ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.emoji} {t(link.labelKey)}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary btn-mobile">
            🎊 {t('buttons.bookNow')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
