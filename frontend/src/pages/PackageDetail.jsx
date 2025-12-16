import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { getPackageBySlug } from '../services/api';
import './PackageDetail.css';

const PackageDetail = () => {
  const { slug, lang } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('packages');
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentLang = lang || i18n.language || 'en';

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await getPackageBySlug(slug);
        if (response.data && response.data.length > 0) {
          setPkg(response.data[0]);
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching package:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug, navigate, i18n.language]);

  const getCategoryBadge = (price) => {
    if (price < 30) return { text: 'Budget Friendly', emoji: '💰', color: 'green' };
    if (price >= 50) return { text: 'Premium', emoji: '⭐', color: 'purple' };
    return { text: 'Standard', emoji: '🎯', color: 'blue' };
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p className="loading-text">✨ Loading magical package details...</p>
      </div>
    );
  }

  if (!pkg) {
    return null;
  }

  const category = getCategoryBadge(pkg.pricePerChild);

  return (
    <div className="package-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to={`/${currentLang}`} className="breadcrumb-link">
            <span className="breadcrumb-icon">🏠</span>
            <span>Home</span>
          </Link>
          <span className="breadcrumb-separator">→</span>
          <Link to={`/${currentLang}/packages`} className="breadcrumb-link">
            <span className="breadcrumb-icon">🎁</span>
            <span>Packages</span>
          </Link>
          <span className="breadcrumb-separator">→</span>
          <span className="breadcrumb-current">{pkg.name}</span>
        </div>
      </div>

      {/* Package Hero */}
      <section className="package-hero">
        <div className="hero-sparkles">
          <span className="sparkle">✨</span>
          <span className="sparkle">⭐</span>
          <span className="sparkle">🎉</span>
          <span className="sparkle">🎈</span>
          <span className="sparkle">🌟</span>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="category-badge" data-color={category.color}>
              <span className="badge-emoji">{category.emoji}</span>
              <span className="badge-text">{category.text}</span>
            </div>
            <h1 className="hero-title">{pkg.name}</h1>
            <p className="hero-description">{pkg.shortDescription}</p>
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-content">
                  <div className="stat-value">{pkg.durationMinutes} min</div>
                  <div className="stat-label">Duration</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <div className="stat-value">{pkg.minGuests}-{pkg.maxGuests || '∞'}</div>
                  <div className="stat-label">Guests</div>
                </div>
              </div>
              <div className="stat-card stat-card-highlight">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-value">₾{pkg.pricePerChild}</div>
                  <div className="stat-label">Per Child</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="package-content">
        <div className="container">
          <div className="content-grid">
            {/* Main Content */}
            <div className="main-content">
              {/* Description Card */}
              <div className="detail-card">
                <div className="card-header">
                  <h2 className="card-title">
                    <span className="title-icon">📖</span>
                    About This Amazing Package
                  </h2>
                </div>
                <div className="card-body">
                  <div className="description-text markdown-content">
                    <ReactMarkdown>
                      {pkg.fullDescription || pkg.shortDescription}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              {pkg.includedFeatures && pkg.includedFeatures.length > 0 && (
                <div className="detail-card features-card">
                  <div className="card-header">
                    <h2 className="card-title">
                      <span className="title-icon">✨</span>
                      What's Included in Your Party
                    </h2>
                  </div>
                  <div className="card-body">
                    <div className="features-grid">
                      {pkg.includedFeatures.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          <div className="feature-icon">{feature.icon || '🎉'}</div>
                          <div className="feature-label">{feature.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Card */}
              <div className="detail-card pricing-card">
                <div className="card-header">
                  <h2 className="card-title">
                    <span className="title-icon">💵</span>
                    Pricing Details
                  </h2>
                </div>
                <div className="card-body">
                  <div className="pricing-breakdown">
                    <div className="pricing-item">
                      <span className="pricing-label">
                        <span className="pricing-emoji">👶</span>
                        Price per child
                      </span>
                      <span className="pricing-value">₾{pkg.pricePerChild}</span>
                    </div>
                    <div className="pricing-item">
                      <span className="pricing-label">
                        <span className="pricing-emoji">👥</span>
                        Minimum guests
                      </span>
                      <span className="pricing-value">{pkg.minGuests} kids</span>
                    </div>
                    {pkg.maxGuests && (
                      <div className="pricing-item">
                        <span className="pricing-label">
                          <span className="pricing-emoji">🎊</span>
                          Maximum guests
                        </span>
                        <span className="pricing-value">{pkg.maxGuests} kids</span>
                      </div>
                    )}
                    <div className="pricing-divider"></div>
                    <div className="pricing-item pricing-total">
                      <span className="pricing-label">
                        <span className="pricing-emoji">🎉</span>
                        Starting from
                      </span>
                      <span className="pricing-total-value">
                        ₾{pkg.pricePerChild * pkg.minGuests}
                      </span>
                    </div>
                  </div>
                  <div className="pricing-footer">
                    <p className="pricing-note">
                      💡 Use our <Link to={`/${currentLang}/calculator`} className="calculator-link">price calculator</Link> for exact quotes!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              {/* Booking Card */}
              <div className="sticky-booking-card">
                <div className="booking-card-glow"></div>
                <div className="booking-header">
                  <div className="booking-title">
                    <span className="booking-emoji">🎊</span>
                    <h3>Book Your Party</h3>
                  </div>
                  <div className="booking-price">
                    <div className="price-amount">₾{pkg.pricePerChild}</div>
                    <div className="price-label">per child</div>
                  </div>
                </div>

                <div className="booking-actions">
                  <Link to={`/${currentLang}/contact`} className="booking-btn booking-btn-primary">
                    <span className="btn-icon">📞</span>
                    <span>Book Now</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                  <Link to={`/${currentLang}/calculator`} className="booking-btn booking-btn-secondary">
                    <span className="btn-icon">🧮</span>
                    <span>Calculate Price</span>
                  </Link>
                  <Link to={`/${currentLang}/calendar`} className="booking-btn booking-btn-outline">
                    <span className="btn-icon">📅</span>
                    <span>Check Availability</span>
                  </Link>
                </div>

                <div className="booking-help">
                  <div className="help-icon">💬</div>
                  <div className="help-content">
                    <strong>Need help?</strong>
                    <p>Call us at <a href="tel:+995577123456">+995 577 123 456</a></p>
                  </div>
                </div>
              </div>

              {/* Fun Facts Card */}
              <div className="fun-facts-card">
                <div className="fun-facts-header">
                  <h4>
                    <span className="fun-icon">🌟</span>
                    Fun Facts
                  </h4>
                </div>
                <ul className="fun-facts-list">
                  <li className="fun-fact-item">
                    <span className="fact-emoji">🎂</span>
                    <span>Perfect for ages 3-12</span>
                  </li>
                  <li className="fun-fact-item">
                    <span className="fact-emoji">🎨</span>
                    <span>Decorations included</span>
                  </li>
                  <li className="fun-fact-item">
                    <span className="fact-emoji">📸</span>
                    <span>Photo opportunities</span>
                  </li>
                  <li className="fun-fact-item">
                    <span className="fact-emoji">🎈</span>
                    <span>Safe & supervised</span>
                  </li>
                  <li className="fun-fact-item">
                    <span className="fact-emoji">🎁</span>
                    <span>Memorable experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">
                <span className="cta-emoji">🎉</span>
                Ready to Make Magical Memories?
              </h2>
              <p className="cta-description">
                Explore more amazing party packages and find the perfect celebration for your little one!
              </p>
              <Link to={`/${currentLang}/packages`} className="cta-button">
                <span>View All Packages</span>
                <span className="cta-arrow">→</span>
              </Link>
            </div>
            <div className="cta-decorations">
              <span className="cta-decoration">🎈</span>
              <span className="cta-decoration">⭐</span>
              <span className="cta-decoration">🎊</span>
              <span className="cta-decoration">✨</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetail;
