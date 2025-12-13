import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPackages } from '../services/api';
import './Packages.css';

const Packages = () => {
  const { t, i18n } = useTranslation('packages');
  const { lang } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const currentLang = lang || i18n.language || 'en';

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackages();
        const publishedPackages = response.data?.filter(pkg => pkg.publishedAt) || [];
        setPackages(publishedPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [i18n.language]);

  const getFilteredPackages = () => {
    if (filter === 'all') return packages;

    return packages.filter(pkg => {
      const price = pkg.pricePerChild;
      if (filter === 'budget') return price < 30;
      if (filter === 'standard') return price >= 30 && price < 50;
      if (filter === 'premium') return price >= 50;
      return true;
    });
  };

  const filteredPackages = getFilteredPackages();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="packages-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Party Packages</h1>
          <p className="page-subtitle">
            Choose the perfect package for your child's special celebration
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="packages-filter">
        <div className="container">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Packages
            </button>
            <button
              className={`filter-btn ${filter === 'budget' ? 'active' : ''}`}
              onClick={() => setFilter('budget')}
            >
              Budget Friendly
            </button>
            <button
              className={`filter-btn ${filter === 'standard' ? 'active' : ''}`}
              onClick={() => setFilter('standard')}
            >
              Standard
            </button>
            <button
              className={`filter-btn ${filter === 'premium' ? 'active' : ''}`}
              onClick={() => setFilter('premium')}
            >
              Premium
            </button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="packages-section">
        <div className="container">
          {filteredPackages.length === 0 ? (
            <div className="no-packages">
              <p>No packages found for this filter.</p>
            </div>
          ) : (
            <div className="packages-grid">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                  </div>

                  <p className="package-description">{pkg.shortDescription}</p>

                  {pkg.description && (
                    <div className="package-features">
                      <strong>Highlights:</strong>
                      <ul>
                        {pkg.description.split('\n').slice(0, 3).map((line, idx) => (
                          line.trim() && <li key={idx}>{line.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="package-info">
                    <div className="info-item">
                      <span className="info-icon">⏱️</span>
                      <div>
                        <strong>Duration</strong>
                        <p>{pkg.durationMinutes} minutes</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">👥</span>
                      <div>
                        <strong>Guests</strong>
                        <p>{pkg.minGuests}-{pkg.maxGuests || '∞'} children</p>
                      </div>
                    </div>
                  </div>

                  <div className="package-price-bottom">
                    <span className="price-amount">₾{pkg.pricePerChild}</span>
                    <span className="price-text">per child</span>
                  </div>

                  <Link
                    to={`/${currentLang}/packages/${pkg.slug}`}
                    className="btn btn-primary btn-block"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2>Not sure which package to choose?</h2>
            <p>Use our calculator to estimate costs or contact us for personalized recommendations!</p>
            <div className="cta-buttons">
              <Link to={`/${currentLang}/calculator`} className="btn btn-secondary btn-lg">
                Price Calculator
              </Link>
              <Link to={`/${currentLang}/contact`} className="btn btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
