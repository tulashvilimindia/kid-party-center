import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getHeaderMenu } from '../../services/api';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

// Icon mapper - converts icon names from API to emojis
const getIconEmoji = (iconName) => {
  const iconMap = {
    'home': '🏠',
    'packages': '🎁',
    'calculator': '🧮',
    'calendar': '📅',
    'gallery': '📸',
    'about': 'ℹ️',
    'contact': '📞',
  };
  return iconMap[iconName?.toLowerCase()] || '📌';
};

const Header = () => {
  const { t, i18n } = useTranslation('common');
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';
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

  // Fetch header menu from CMS
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setLoading(true);
        const response = await getHeaderMenu();

        // Process menu items and convert icon names to emojis
        const processedItems = (response.data || []).map(item => ({
          ...item,
          icon: getIconEmoji(item.icon)
        }));

        setNavItems(processedItems);
      } catch (error) {
        console.error('Error loading header menu:', error);
        // Fallback to default navigation if API fails
        setNavItems([
          { path: '/', label: 'HOME', icon: '🏠', order: 1 },
          { path: '/packages', label: 'PACKAGES', icon: '🎁', order: 2 },
          { path: '/calculator', label: 'CALCULATOR', icon: '🧮', order: 3 },
          { path: '/calendar', label: 'CALENDAR', icon: '📅', order: 4 },
          { path: '/gallery', label: 'GALLERY', icon: '📸', order: 5 },
          { path: '/about', label: 'ABOUT', icon: 'ℹ️', order: 6 },
          { path: '/contact', label: 'CONTACT', icon: '📞', order: 7 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, [i18n.language]);

  // Helper function to build path with language
  const buildPath = (path) => {
    const cleanPath = path.replace(/^\//, ''); // Remove leading slash if exists
    return `/${currentLang}${cleanPath ? '/' + cleanPath : ''}`;
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to={`/${currentLang}`} className="logo wiggle-on-hover">
            <span className="logo-emoji">🎉</span>
            <span className="logo-text">Kid</span>
            <span className="logo-text-accent">Party</span>
            <span className="logo-emoji">🎈</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {!loading && navItems.map((item) => {
              const itemPath = buildPath(item.path);
              return (
                <Link
                  key={item.path}
                  to={itemPath}
                  className={`nav-link ${location.pathname === itemPath ? 'active' : ''}`}
                >
                  {item.icon} {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher />

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
          {!loading && navItems.map((item) => {
            const itemPath = buildPath(item.path);
            return (
              <Link
                key={item.path}
                to={itemPath}
                className={`nav-link-mobile ${location.pathname === itemPath ? 'active' : ''}`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
