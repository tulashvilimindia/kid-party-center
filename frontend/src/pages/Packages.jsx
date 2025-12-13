import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPackages } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Icons from '../components/ui/Icons';
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

  // Determine badge for package based on price
  const getPackageBadge = (price) => {
    if (price >= 50) return { text: '⭐ Premium', variant: 'accent' };
    if (price >= 30) return { text: '✨ Popular', variant: 'primary' };
    return { text: '💰 Budget', variant: 'secondary' };
  };

  if (loading) {
    return (
      <div className="star-loading">
        <div className="star-spinner"></div>
      </div>
    );
  }

  return (
    <div className="star-packages-page">
      {/* Page Header */}
      <section className="star-page-header">
        <div className="container">
          <h1 className="text-gradient">Party Packages 🎁</h1>
          <p className="star-page-subtitle">
            Choose the perfect package for your child's special celebration
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="star-filter-section section-sm">
        <div className="container">
          <div className="star-filter-buttons">
            <Button
              variant={filter === 'all' ? 'primary' : 'ghost'}
              size="md"
              onClick={() => setFilter('all')}
            >
              All Packages
            </Button>
            <Button
              variant={filter === 'budget' ? 'secondary' : 'ghost'}
              size="md"
              onClick={() => setFilter('budget')}
              icon="💰"
            >
              Budget Friendly
            </Button>
            <Button
              variant={filter === 'standard' ? 'primary' : 'ghost'}
              size="md"
              onClick={() => setFilter('standard')}
              icon="✨"
            >
              Standard
            </Button>
            <Button
              variant={filter === 'premium' ? 'accent' : 'ghost'}
              size="md"
              onClick={() => setFilter('premium')}
              icon="⭐"
            >
              Premium
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="star-packages-list section">
        <div className="container">
          {filteredPackages.length === 0 ? (
            <Card className="star-no-packages">
              <div className="star-empty-state">
                <div className="star-empty-icon">📦</div>
                <h3>No packages found</h3>
                <p>Try selecting a different filter to see more packages.</p>
                <Button variant="primary" onClick={() => setFilter('all')}>
                  Show All Packages
                </Button>
              </div>
            </Card>
          ) : (
            <div className="star-packages-grid">
              {filteredPackages.map((pkg, index) => {
                const badge = getPackageBadge(pkg.pricePerChild);
                const isFeatured = pkg.pricePerChild >= 30 && pkg.pricePerChild < 50;

                return (
                  <Card
                    key={pkg.id}
                    className="star-package-card"
                    variant={isFeatured ? 'gradient' : 'default'}
                    hover={true}
                  >
                    <Badge
                      variant={badge.variant}
                      size="md"
                      className="star-package-badge"
                    >
                      {badge.text}
                    </Badge>

                    <div className="star-package-header">
                      <h3>{pkg.name}</h3>
                      <p className="star-package-description">{pkg.shortDescription}</p>
                    </div>

                    {pkg.includedFeatures && pkg.includedFeatures.length > 0 && (
                      <div className="star-package-features">
                        <h4>Included:</h4>
                        <ul>
                          {pkg.includedFeatures.slice(0, 4).map((feature, idx) => (
                            <li key={idx}>
                              <Icons name={feature.icon || 'star'} size={16} />
                              <span>{feature.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="star-package-details">
                      <div className="star-package-detail">
                        <Icons name="party" size={20} />
                        <div>
                          <strong>Duration</strong>
                          <span>{pkg.durationMinutes} min</span>
                        </div>
                      </div>
                      <div className="star-package-detail">
                        <Icons name="party" size={20} />
                        <div>
                          <strong>Guests</strong>
                          <span>{pkg.minGuests}-{pkg.maxGuests || '∞'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="star-package-price">
                      <span className="star-price-amount">₾{pkg.pricePerChild}</span>
                      <span className="star-price-text">per child</span>
                    </div>

                    <Link to={`/${currentLang}/packages/${pkg.slug}`}>
                      <Button variant="primary" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="star-packages-cta section">
        <div className="container">
          <Card variant="gradient" className="star-cta-card">
            <div className="star-cta-content">
              <h2>Not sure which package to choose? 🤔</h2>
              <p>Use our calculator to estimate costs or contact us for personalized recommendations!</p>
              <div className="star-cta-buttons">
                <Link to={`/${currentLang}/calculator`}>
                  <Button variant="white" size="lg" icon="🧮">
                    Price Calculator
                  </Button>
                </Link>
                <Link to={`/${currentLang}/contact`}>
                  <Button variant="outline" size="lg" icon="📞">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Packages;
