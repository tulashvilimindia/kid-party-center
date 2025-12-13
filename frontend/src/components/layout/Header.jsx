import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getHeaderMenu } from '../../services/api';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Icons, { StarLogo } from '../ui/Icons';
import './Header.css';

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
      setIsScrolled(window.scrollY > 20);
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
        setNavItems(response.data || []);
      } catch (error) {
        console.error('Error loading header menu:', error);
        // Fallback to default navigation if API fails
        setNavItems([
          { path: '/', label: 'HOME', icon: 'home', order: 1 },
          { path: '/packages', label: 'PACKAGES', icon: 'packages', order: 2 },
          { path: '/calculator', label: 'CALCULATOR', icon: 'calculator', order: 3 },
          { path: '/calendar', label: 'CALENDAR', icon: 'calendar', order: 4 },
          { path: '/gallery', label: 'GALLERY', icon: 'gallery', order: 5 },
          { path: '/about', label: 'ABOUT', icon: 'about', order: 6 },
          { path: '/contact', label: 'CONTACT', icon: 'contact', order: 7 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, [i18n.language]);

  // Helper function to build path with language
  const buildPath = (path) => {
    const cleanPath = path.replace(/^\//, '');
    return `/${currentLang}${cleanPath ? '/' + cleanPath : ''}`;
  };

  const isActive = (itemPath) => {
    const fullPath = buildPath(itemPath);
    return location.pathname === fullPath;
  };

  return (
    <header className={`star-header ${isScrolled ? 'star-header-scrolled' : ''}`}>
      <div className="container">
        <div className="star-header-content">
          {/* Logo */}
          <Link to={`/${currentLang}`} className="star-logo">
            <StarLogo size={40} className="star-logo-icon" />
            <span className="star-logo-text">
              <span className="star-logo-brand">STAR</span>
              <span className="star-logo-tagline">Kids Party</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="star-nav-desktop" aria-label="Main navigation">
            {!loading && navItems.map((item) => {
              const itemPath = buildPath(item.path);
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={itemPath}
                  className={`star-nav-link ${active ? 'star-nav-link-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icons name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Language Switcher */}
          <div className="star-header-actions">
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              className={`star-mobile-menu-btn ${isMobileMenuOpen ? 'star-mobile-menu-btn-open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`star-nav-mobile ${isMobileMenuOpen ? 'star-nav-mobile-open' : ''}`}
          aria-label="Mobile navigation"
        >
          {!loading && navItems.map((item) => {
            const itemPath = buildPath(item.path);
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={itemPath}
                className={`star-nav-link-mobile ${active ? 'star-nav-link-mobile-active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icons name={item.icon} size={24} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
