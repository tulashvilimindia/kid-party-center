import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSiteSettings, getSocialLinks, getFooter } from '../../services/api';
import './Footer.css';

const Footer = () => {
  const { t, i18n } = useTranslation('common');
  const { lang } = useParams();
  const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [footer, setFooter] = useState(null);
  const currentYear = new Date().getFullYear();

  // Get current language from URL or fallback to i18n
  const currentLang = lang || i18n.language || 'en';

  // Helper function to build paths with language prefix
  const buildPath = (path) => {
    const cleanPath = path.replace(/^\//, '');
    return `/${currentLang}${cleanPath ? '/' + cleanPath : ''}`;
  };

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [settingsData, socialData, footerData] = await Promise.all([
          getSiteSettings(),
          getSocialLinks(),
          getFooter()
        ]);
        setSettings(settingsData.data);
        setSocialLinks(socialData.data || []);
        setFooter(footerData.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, [i18n.language]);

  // Get footer copy with fallback
  const copy = footer?.copy || {};

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <Link to={`/${currentLang}`} className="footer-logo wiggle-on-hover">
              <span className="logo-emoji">{copy.footer_brand_icon || '🎉'}</span>
              <span className="logo-text">{copy.footer_brand_name || 'Kid'}</span>
              <span className="logo-text-accent">Party</span>
              <span className="logo-emoji">🎈</span>
            </Link>
            <p className="footer-tagline">
              {copy.footer_brand_tagline || settings?.footerTagline || '🌟 Unforgettable Kids Parties in Batumi! 🌟'}
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
            <h4 className="footer-title">{copy.footer_qlinks_header || '🔗 Quick Links'}</h4>
            <ul className="footer-links">
              <li><Link to={buildPath('')}>{copy.footer_qlinks_1 || '🏠 Home'}</Link></li>
              <li><Link to={buildPath('packages')}>{copy.footer_qlinks_2 || '🎁 Packages'}</Link></li>
              <li><Link to={buildPath('calculator')}>{copy.footer_qlinks_3 || '🧮 Calculator'}</Link></li>
              <li><Link to={buildPath('calendar')}>{copy.footer_qlinks_4 || '📅 Calendar'}</Link></li>
              <li><Link to={buildPath('gallery')}>{copy.footer_qlinks_5 || '📸 Gallery'}</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div className="footer-section">
            <h4 className="footer-title">{copy.footer_info_header || 'ℹ️ Information'}</h4>
            <ul className="footer-links">
              <li><Link to={buildPath('about')}>{copy.footer_info_1 || '👥 About Us'}</Link></li>
              <li><Link to={buildPath('contact')}>{copy.footer_info_2 || '📞 Contact'}</Link></li>
              <li><Link to={buildPath('faq')}>{copy.footer_info_3 || '❓ FAQ'}</Link></li>
              <li><Link to={buildPath('privacy')}>{copy.footer_info_4 || '🔒 Privacy Policy'}</Link></li>
              <li><Link to={buildPath('terms')}>{copy.footer_info_5 || '📄 Terms & Conditions'}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">{copy.footer_contact_header || '📞 Contact Us'}</h4>
            <ul className="footer-contact">
              <li>
                {copy.footer_contact_1_href ? (
                  <a href={copy.footer_contact_1_href} target="_blank" rel="noopener noreferrer">
                    {copy.footer_contact_1 || '📍 Batumi, Georgia'}
                  </a>
                ) : (
                  <span>{copy.footer_contact_1 || '📍 Batumi, Georgia'}</span>
                )}
              </li>
              <li>
                {copy.footer_contact_2_href ? (
                  <a href={copy.footer_contact_2_href}>
                    {copy.footer_contact_2 || '☎️ +995 577 123 456'}
                  </a>
                ) : (
                  <span>{copy.footer_contact_2 || '☎️ +995 577 123 456'}</span>
                )}
              </li>
              <li>
                {copy.footer_contact_3_href ? (
                  <a href={copy.footer_contact_3_href}>
                    {copy.footer_contact_3 || '✉️ info@kidparty.ge'}
                  </a>
                ) : (
                  <span>{copy.footer_contact_3 || '✉️ info@kidparty.ge'}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} {copy.footer_brand_name || 'KidParty'} 🎉 {t('footer.rights')} • {t('footer.making')} 🌈</p>
          <p>{t('footer.madeWith')} 💖 & ✨ {t('footer.inBatumi')} 🇬🇪</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
