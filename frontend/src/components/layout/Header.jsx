import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getNavigationMenu } from '../../services/api';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch navigation menu from CMS
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setLoading(true);
        const response = await getNavigationMenu();
        setNavItems(response.data || []);
      } catch (error) {
        console.error('Error loading navigation:', error);
        // Fallback to default navigation if API fails
        setNavItems([
          { path: '/', label: t('nav.home'), icon: '🏠', order: 1 },
          { path: '/packages', label: t('nav.packages'), icon: '🎁', order: 2 },
          { path: '/calculator', label: t('nav.calculator'), icon: '🧮', order: 3 },
          { path: '/calendar', label: t('nav.calendar'), icon: '📅', order: 4 },
          { path: '/gallery', label: t('nav.gallery'), icon: '📸', order: 5 },
          { path: '/about', label: t('nav.about'), icon: 'ℹ️', order: 6 },
          { path: '/contact', label: t('nav.contact'), icon: '📞', order: 7 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, [i18n.language, t]);

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
            {!loading && navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon} {item.label}
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
          {!loading && navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link-mobile ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon} {item.label}
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
