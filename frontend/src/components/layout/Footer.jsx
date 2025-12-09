import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSiteSettings, getSocialLinks } from '../../services/api';
import './Footer.css';

const Footer = () => {
  const { t, i18n } = useTranslation('common');
  const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [settingsData, socialData] = await Promise.all([
          getSiteSettings(),
          getSocialLinks()
        ]);
        setSettings(settingsData.data);
        setSocialLinks(socialData.data || []);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, [i18n.language]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <Link to="/" className="footer-logo wiggle-on-hover">
              <span className="logo-emoji">🎉</span>
              <span className="logo-text">Kid</span>
              <span className="logo-text-accent">Party</span>
              <span className="logo-emoji">🎈</span>
            </Link>
            <p className="footer-tagline">
              {settings?.footerTagline || '🌟 Unforgettable Kids Parties in Batumi! 🌟'}
            </p>
            <div className="social-links">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={link.platform}
                  >
                    {link.icon || '🔗'}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href={settings?.facebookUrl || "https://facebook.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Facebook"
                  >
                    📘
                  </a>
                  <a
                    href={settings?.instagramUrl || "https://instagram.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Instagram"
                  >
                    📷
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">🔗 Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">🏠 Home</Link></li>
              <li><Link to="/packages">🎁 Packages</Link></li>
              <li><Link to="/calculator">🧮 Calculator</Link></li>
              <li><Link to="/calendar">📅 Calendar</Link></li>
              <li><Link to="/gallery">📸 Gallery</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div className="footer-section">
            <h4 className="footer-title">ℹ️ Information</h4>
            <ul className="footer-links">
              <li><Link to="/about">👨‍👩‍👧‍👦 About Us</Link></li>
              <li><Link to="/contact">📞 Contact</Link></li>
              <li><Link to="/faq">❓ FAQ</Link></li>
              <li><Link to="/privacy">🔒 Privacy Policy</Link></li>
              <li><Link to="/terms">📋 Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">📞 {t('footer.contactUs')}</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-emoji">📍</span>
                {settings?.address || 'Batumi, Georgia'}
              </li>
              <li>
                <span className="contact-emoji">☎️</span>
                {settings?.phone || '+995 577 123 456'}
              </li>
              <li>
                <span className="contact-emoji">✉️</span>
                {settings?.email || 'info@kidparty.ge'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} KidParty 🎉 {t('footer.rights')} • {t('footer.making')} 🌈</p>
          <p>{t('footer.madeWith')} 💖 & ✨ {t('footer.inBatumi')} 🇬🇪</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
