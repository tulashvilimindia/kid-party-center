import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPackageBySlug } from '../services/api';
import './PackageDetail.css';

const PackageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('packages');
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!pkg) {
    return null;
  }

  return (
    <div className="package-detail">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/packages">Packages</Link>
          <span className="separator">/</span>
          <span className="current">{pkg.name}</span>
        </div>
      </div>

      {/* Package Hero */}
      <section className="package-hero">
        <div className="container">
          <div className="hero-content">
            <h1>{pkg.name}</h1>
            <p className="hero-description">{pkg.shortDescription}</p>
            <div className="hero-meta">
              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <div>
                  <strong>Duration</strong>
                  <p>{pkg.durationMinutes} minutes</p>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">👥</span>
                <div>
                  <strong>Group Size</strong>
                  <p>{pkg.minGuests}-{pkg.maxGuests || '∞'} guests</p>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">💰</span>
                <div>
                  <strong>Price</strong>
                  <p>${pkg.pricePerChild} per child</p>
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
              <div className="content-section">
                <h2>About This Package</h2>
                <div className="description">
                  {pkg.description ? (
                    pkg.description.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{pkg.shortDescription}</p>
                  )}
                </div>
              </div>

              {pkg.includedItems && (
                <div className="content-section">
                  <h2>What's Included</h2>
                  <ul className="included-list">
                    {pkg.includedItems.split(',').map((item, idx) => (
                      <li key={idx}>
                        <span className="check-icon">✓</span>
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="content-section">
                <h2>Pricing Details</h2>
                <div className="pricing-table">
                  <div className="pricing-row">
                    <span>Base Price (per child)</span>
                    <strong>${pkg.pricePerChild}</strong>
                  </div>
                  <div className="pricing-row">
                    <span>Minimum Guests</span>
                    <strong>{pkg.minGuests} children</strong>
                  </div>
                  {pkg.maxGuests && (
                    <div className="pricing-row">
                      <span>Maximum Guests</span>
                      <strong>{pkg.maxGuests} children</strong>
                    </div>
                  )}
                  <div className="pricing-row total">
                    <span>Estimated Total ({pkg.minGuests} guests)</span>
                    <strong className="total-price">
                      ${pkg.pricePerChild * pkg.minGuests}
                    </strong>
                  </div>
                </div>
                <p className="pricing-note">
                  * Use our <Link to="/calculator">price calculator</Link> for accurate quotes based on your guest count
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              <div className="booking-card">
                <div className="card-header">
                  <h3>Book This Package</h3>
                  <div className="price-display">
                    <span className="price">${pkg.pricePerChild}</span>
                    <span className="price-label">per child</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <Link to="/contact" className="btn btn-primary btn-block btn-lg">
                    Book Now
                  </Link>
                  <Link to="/calculator" className="btn btn-secondary btn-block">
                    Calculate Price
                  </Link>
                  <Link to="/calendar" className="btn btn-outline btn-block">
                    Check Availability
                  </Link>
                </div>

                <div className="card-footer">
                  <p>
                    <strong>Need help?</strong><br />
                    Contact us at <a href="tel:+995577123456">+995 577 123 456</a>
                  </p>
                </div>
              </div>

              <div className="info-card">
                <h4>Quick Info</h4>
                <ul className="info-list">
                  <li>
                    <span className="info-icon">🎉</span>
                    <span>Perfect for ages 3-12</span>
                  </li>
                  <li>
                    <span className="info-icon">🎂</span>
                    <span>Decorations included</span>
                  </li>
                  <li>
                    <span className="info-icon">📸</span>
                    <span>Photo opportunities</span>
                  </li>
                  <li>
                    <span className="info-icon">🎈</span>
                    <span>Safe & supervised</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="related-section">
        <div className="container">
          <h2 className="text-center">Other Packages You Might Like</h2>
          <div className="text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link to="/packages" className="btn btn-secondary btn-lg">
              View All Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetail;
