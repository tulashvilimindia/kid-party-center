import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
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

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Contact Us</h1>
          <p className="page-subtitle">
            Get in touch to plan your perfect party
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <p className="form-description">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  <p>Thank you! We'll contact you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+995 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="packageInterest">Package Interest</label>
                  <select
                    id="packageInterest"
                    name="packageInterest"
                    value={formData.packageInterest}
                    onChange={handleChange}
                  >
                    <option value="">Select a package</option>
                    <option value="basic">Basic Party</option>
                    <option value="deluxe">Deluxe Party</option>
                    <option value="premium">Premium Party</option>
                    <option value="custom">Custom Package</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your party plans..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="contact-details">
                  <div className="detail-item">
                    <div className="detail-icon">📍</div>
                    <div>
                      <strong>Address</strong>
                      <p>Batumi, Georgia</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">📞</div>
                    <div>
                      <strong>Phone</strong>
                      <p><a href="tel:+995577123456">+995 577 123 456</a></p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">✉️</div>
                    <div>
                      <strong>Email</strong>
                      <p><a href="mailto:info@beqaparty.ge">info@beqaparty.ge</a></p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon">🕐</div>
                    <div>
                      <strong>Hours</strong>
                      <p>Mon-Sun: 10:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Quick Links</h3>
                <div className="quick-links">
                  <Link to="/packages" className="quick-link">
                    <span>📦</span>
                    <span>View Packages</span>
                  </Link>
                  <Link to="/calculator" className="quick-link">
                    <span>🧮</span>
                    <span>Price Calculator</span>
                  </Link>
                  <Link to="/calendar" className="quick-link">
                    <span>📅</span>
                    <span>Check Availability</span>
                  </Link>
                  <Link to="/faq" className="quick-link">
                    <span>❓</span>
                    <span>FAQ</span>
                  </Link>
                </div>
              </div>

              <div className="info-card social-card">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a
                    href="https://facebook.com/beqaparty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link facebook"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com/beqaparty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link instagram"
                  >
                    Instagram
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
