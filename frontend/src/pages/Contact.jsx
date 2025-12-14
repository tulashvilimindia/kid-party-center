import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getContact, getPackages } from '../services/api';
import './Contact.css';

const Contact = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';

  const [contactData, setContactData] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    packageInterest: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactResponse, packagesResponse] = await Promise.all([
          getContact(),
          getPackages()
        ]);
        setContactData(contactResponse.data);

        // Strapi returns { data: [...] }, extract the array
        const packagesArray = packagesResponse.data || [];
        setPackages(packagesArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  // Get contact texts with fallback
  const texts = contactData?.contact || {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send data to the backend
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: '',
        packageInterest: '',
        message: ''
      });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">{texts.page_title || 'Contact Us'}</h1>
          <p className="page-subtitle">
            {texts.page_subtitle || 'Get in Touch with BeqaParty'}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>{texts.form_title || 'Send Us a Message'}</h2>
              <p className="form-description">
                {texts.form_description || 'Fill out the form below and we\'ll get back to you as soon as possible.'}
              </p>

              {submitted && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  <p>{texts.form_success || 'Thank you! Your message has been sent. We\'ll get back to you soon.'}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{texts.form_name || 'Name'} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={texts.form_name_placeholder || 'Enter your name'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">{texts.form_phone || 'Phone'} *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={texts.form_phone_placeholder || 'Enter your phone number'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">{texts.form_email || 'Email'} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={texts.form_email_placeholder || 'Enter your email address'}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">{texts.form_date || 'Preferred Date'}</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="guests">{texts.form_guests || 'Number of Guests'}</label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      placeholder={texts.form_guests_placeholder || 'e.g. 15'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="packageInterest">{texts.form_package || 'Package Interest'}</label>
                  <select
                    id="packageInterest"
                    name="packageInterest"
                    value={formData.packageInterest}
                    onChange={handleChange}
                  >
                    <option value="">{texts.form_package_placeholder || 'Select a package'}</option>
                    {packages && packages.length > 0 ? (
                      packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>Loading packages...</option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{texts.form_message || 'Message'} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder={texts.form_message_placeholder || 'Tell us about your party...'}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  {texts.form_submit || 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <div className="info-card">
                <h3>{texts.info_card_title || 'Contact Information'}</h3>
                <div className="contact-details">
                  <div className="detail-item">
                    <div className="detail-icon">📍</div>
                    <div>
                      <strong>{texts.info_location_label || 'Location'}</strong>
                      <p>{texts.info_location_value || 'Batumi, Georgia'}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">📞</div>
                    <div>
                      <strong>{texts.info_phone_label || 'Phone'}</strong>
                      <p>
                        <a href={`tel:${texts.info_phone_value?.replace(/\s/g, '') || '+995577123456'}`}>
                          {texts.info_phone_value || '+995 577 123 456'}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">✉️</div>
                    <div>
                      <strong>{texts.info_email_label || 'Email'}</strong>
                      <p>
                        <a href={`mailto:${texts.info_email_value || 'info@beqaparty.ge'}`}>
                          {texts.info_email_value || 'info@beqaparty.ge'}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">🕐</div>
                    <div>
                      <strong>{texts.info_hours_label || 'Hours'}</strong>
                      <p>{texts.info_hours_value || 'Mon–Sun: 10:00–20:00'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>{texts.quick_links_title || 'Quick Links'}</h3>
                <div className="quick-links">
                  <Link to={`/${currentLang}/packages`} className="quick-link">
                    <span>{texts.quick_link_1_icon || '📦'}</span>
                    <span>{texts.quick_link_1_label || 'View Packages'}</span>
                  </Link>
                  <Link to={`/${currentLang}/calculator`} className="quick-link">
                    <span>{texts.quick_link_2_icon || '🧮'}</span>
                    <span>{texts.quick_link_2_label || 'Price Calculator'}</span>
                  </Link>
                  <Link to={`/${currentLang}/calendar`} className="quick-link">
                    <span>{texts.quick_link_3_icon || '📅'}</span>
                    <span>{texts.quick_link_3_label || 'Check Availability'}</span>
                  </Link>
                  <Link to={`/${currentLang}/faq`} className="quick-link">
                    <span>{texts.quick_link_4_icon || '❓'}</span>
                    <span>{texts.quick_link_4_label || 'FAQ'}</span>
                  </Link>
                </div>
              </div>

              <div className="info-card social-card">
                <h3>{texts.social_title || 'Follow Us'}</h3>
                <div className="social-links">
                  <a
                    href={texts.social_facebook_url || 'https://facebook.com/beqaparty'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link facebook"
                  >
                    {texts.social_facebook_label || 'Facebook'}
                  </a>
                  <a
                    href={texts.social_instagram_url || 'https://instagram.com/beqaparty'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link instagram"
                  >
                    {texts.social_instagram_label || 'Instagram'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
