import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPackages, getSiteSettings } from '../services/api';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import './Home.css';

const Home = () => {
  const { t, i18n } = useTranslation(['home', 'common']);
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';
  const [packages, setPackages] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to build path with language
  const buildPath = (path) => {
    const cleanPath = path.replace(/^\//, ''); // Remove leading slash if exists
    return `/${currentLang}${cleanPath ? '/' + cleanPath : ''}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [packagesData, settingsData] = await Promise.all([
          getPackages(),
          getSiteSettings()
        ]);

        // Get only published packages
        const publishedPackages = packagesData.data?.filter(pkg => pkg.publishedAt) || [];
        setPackages(publishedPackages.slice(0, 3)); // Show only 3 featured packages
        setSettings(settingsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]); // Refetch when language changes

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              {settings?.heroTitle}
            </h1>
            <p className="hero-subtitle">
              {settings?.heroSubtitle}
            </p>
            <div className="hero-buttons">
              <Link to={buildPath('packages')} className="btn btn-primary btn-lg">
                {t('home:hero.viewPackages')}
              </Link>
              <Link to={buildPath('contact')} className="btn btn-outline btn-lg">
                {t('common:buttons.bookNow')}
              </Link>
            </div>
          </div>
          <div className="hero-decoration">
            <div className="floating-emoji">🎈</div>
            <div className="floating-emoji">🎉</div>
            <div className="floating-emoji">🎂</div>
            <div className="floating-emoji">🎁</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎪</div>
              <h3>{settings?.featureVenueTitle || t('home:features.venue.title')}</h3>
              <p>{settings?.featureVenueDescription || t('home:features.venue.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>{settings?.featureActivitiesTitle || t('home:features.activities.title')}</h3>
              <p>{settings?.featureActivitiesDescription || t('home:features.activities.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍕</div>
              <h3>{settings?.featureFoodTitle || t('home:features.food.title')}</h3>
              <p>{settings?.featureFoodDescription || t('home:features.food.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>{settings?.featureStressFreeTitle || t('home:features.stressFree.title')}</h3>
              <p>{settings?.featureStressFreeDescription || t('home:features.stressFree.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="featured-packages">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-gradient">{settings?.packagesTitle || t('home:packages.title')}</h2>
            <p>{settings?.packagesSubtitle || t('home:packages.subtitle')}</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-badge">{t('home:packages.popular')}</div>
                <h3>{pkg.name}</h3>
                <p className="package-description">{pkg.shortDescription}</p>
                <div className="package-details">
                  <div className="package-detail">
                    <span className="detail-icon">⏱️</span>
                    <span>{pkg.durationMinutes} {t('home:packages.min')}</span>
                  </div>
                  <div className="package-detail">
                    <span className="detail-icon">👥</span>
                    <span>{pkg.minGuests}-{pkg.maxGuests || '∞'} {t('home:packages.guests')}</span>
                  </div>
                </div>
                <div className="package-price">
                  <span className="price-amount">${pkg.pricePerChild}</span>
                  <span className="price-text">{t('home:packages.perChild')}</span>
                </div>
                <Link to={buildPath(`packages/${pkg.slug}`)} className="btn btn-primary btn-block">
                  {t('common:buttons.viewDetails')}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to={buildPath('packages')} className="btn btn-secondary btn-lg">
              {t('home:packages.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{settings?.ctaTitle || t('home:cta.title')}</h2>
            <p>{settings?.ctaSubtitle || t('home:cta.subtitle')}</p>
            <div className="cta-buttons">
              <Link to={buildPath('contact')} className="btn btn-primary btn-lg">
                {t('home:cta.bookButton')}
              </Link>
              <Link to={buildPath('calendar')} className="btn btn-outline btn-lg">
                {t('home:cta.checkAvailability')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
