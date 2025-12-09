import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
    { path: '/', label: '🏠 Home', emoji: '🏠' },
    { path: '/packages', label: '🎁 Packages', emoji: '🎁' },
    { path: '/calculator', label: '🧮 Calculator', emoji: '🧮' },
    { path: '/calendar', label: '📅 Calendar', emoji: '📅' },
    { path: '/gallery', label: '📸 Gallery', emoji: '📸' },
    { path: '/about', label: 'ℹ️ About', emoji: 'ℹ️' },
    { path: '/contact', label: '📞 Contact', emoji: '📞' },
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
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Book Now Button */}
          <Link to="/contact" className="btn btn-primary btn-book">
            🎊 Book Now!
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
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary btn-mobile">
            🎊 Book Your Party Now!
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
