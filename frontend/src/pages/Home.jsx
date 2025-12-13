import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPackages, getSiteSettings } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Icons from '../components/ui/Icons';
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
    const cleanPath = path.replace(/^\//, '');
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

        const publishedPackages = packagesData.data?.filter(pkg => pkg.publishedAt) || [];
        setPackages(publishedPackages.slice(0, 3));
        setSettings(settingsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="star-loading">
        <div className="star-spinner"></div>
      </div>
    );
  }

  return (
    <div className="star-home">
      {/* Hero Section */}
      <section className="star-hero">
        <div className="star-hero-bg"></div>
        <div className="container">
          <div className="star-hero-content">
            <div className="star-hero-text">
              <h1 className="star-hero-title animate-fade-in">
                {settings?.heroTitle || 'Unforgettable Birthday Parties for Kids! ⭐'}
              </h1>
              <p className="star-hero-subtitle">
                {settings?.heroSubtitle || 'Create magical memories with fun games, delicious food, and professional entertainment at STAR Kids Party Center'}
              </p>
              <div className="star-hero-buttons">
                <Link to={buildPath('contact')}>
                  <Button size="xl" icon="🎉">
                    {t('common:buttons.bookNow')}
                  </Button>
                </Link>
                <Link to={buildPath('packages')}>
                  <Button variant="outline" size="xl" icon="🎁">
                    {t('home:hero.viewPackages')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="star-hero-visual">
              <div className="star-shape star-shape-1"></div>
              <div className="star-shape star-shape-2"></div>
              <div className="star-shape star-shape-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="star-features section">
        <div className="container">
          <div className="text-center mb-12">
            <h2>Why Choose STAR? ⭐</h2>
            <p className="star-subtitle">
              Everything you need for an amazing party experience
            </p>
          </div>
          <div className="star-features-grid">
            <Card className="star-feature-card animate-fade-in">
              <div className="star-feature-icon">🛡️</div>
              <h3>Safe & Secure</h3>
              <p>Professional supervision and child-safe environment for complete peace of mind</p>
            </Card>
            <Card className="star-feature-card animate-fade-in">
              <div className="star-feature-icon">🎊</div>
              <h3>Super Fun</h3>
              <p>Exciting games, activities, and entertainment that kids absolutely love</p>
            </Card>
            <Card className="star-feature-card animate-fade-in">
              <div className="star-feature-icon">📅</div>
              <h3>Easy Booking</h3>
              <p>Simple online booking system and flexible packages for any budget</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="star-packages section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-gradient">Popular Party Packages 🎁</h2>
            <p className="star-subtitle">
              {settings?.packagesSubtitle || 'Choose the perfect package for your celebration'}
            </p>
          </div>

          <div className="star-packages-grid">
            {packages.map((pkg, index) => (
              <Card key={pkg.id} className="star-package-card" variant={index === 1 ? 'featured' : 'default'}>
                {index === 1 && (
                  <Badge variant="secondary" className="star-package-badge">
                    ⭐ Most Popular
                  </Badge>
                )}
                <div className="star-package-header">
                  <h3>{pkg.name}</h3>
                  <p className="star-package-description">{pkg.shortDescription}</p>
                </div>
                <div className="star-package-details">
                  <div className="star-package-detail">
                    <Icons name="clock" size={20} />
                    <span>{pkg.durationMinutes} min</span>
                  </div>
                  <div className="star-package-detail">
                    <Icons name="party" size={20} />
                    <span>{pkg.minGuests}-{pkg.maxGuests || '∞'} guests</span>
                  </div>
                </div>
                <div className="star-package-price">
                  <span className="star-price-amount">₾{pkg.pricePerChild}</span>
                  <span className="star-price-text">per child</span>
                </div>
                <Link to={buildPath(`packages/${pkg.slug}`)}>
                  <Button variant={index === 1 ? 'white' : 'primary'} fullWidth>
                    View Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={buildPath('packages')}>
              <Button variant="secondary" size="lg" icon="🎁">
                View All Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="star-cta section">
        <div className="container">
          <Card className="star-cta-card" variant="gradient">
            <div className="star-cta-content">
              <h2>{settings?.ctaTitle || 'Ready to Plan an Amazing Party? 🎉'}</h2>
              <p>{settings?.ctaSubtitle || 'Book your date now and give your child a birthday they\'ll never forget!'}</p>
              <div className="star-cta-buttons">
                <Link to={buildPath('contact')}>
                  <Button variant="white" size="lg" icon="📞">
                    Book Your Party
                  </Button>
                </Link>
                <Link to={buildPath('calendar')}>
                  <Button variant="outline" size="lg" icon="📅">
                    Check Availability
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

export default Home;
