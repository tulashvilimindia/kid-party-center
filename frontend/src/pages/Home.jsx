import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPackages, getSiteSettings } from '../services/api';
import './Home.css';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

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
              {settings?.heroTitle || 'Unforgettable Kids Parties in Batumi!'}
            </h1>
            <p className="hero-subtitle">
              {settings?.heroSubtitle || 'Fun, safe, magical experiences for children.'}
            </p>
            <div className="hero-buttons">
              <Link to="/packages" className="btn btn-primary btn-lg">
                View Packages
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Book Now
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
              <h3>Amazing Venue</h3>
              <p>Safe, clean, and fun-filled party spaces designed for kids</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Fun Activities</h3>
              <p>Face painting, games, entertainment, and so much more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍕</div>
              <h3>Delicious Food</h3>
              <p>Kid-friendly menu options that everyone will love</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>Stress-Free</h3>
              <p>We handle everything - you just enjoy the celebration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="featured-packages">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-gradient">Our Party Packages</h2>
            <p>Choose the perfect package for your child's special day</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-badge">Popular</div>
                <h3>{pkg.name}</h3>
                <p className="package-description">{pkg.shortDescription}</p>
                <div className="package-details">
                  <div className="package-detail">
                    <span className="detail-icon">⏱️</span>
                    <span>{pkg.durationMinutes} min</span>
                  </div>
                  <div className="package-detail">
                    <span className="detail-icon">👥</span>
                    <span>{pkg.minGuests}-{pkg.maxGuests || '∞'} guests</span>
                  </div>
                </div>
                <div className="package-price">
                  <span className="price-amount">${pkg.pricePerChild}</span>
                  <span className="price-text">per child</span>
                </div>
                <Link to={`/packages/${pkg.slug}`} className="btn btn-primary btn-block">
                  View Details
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/packages" className="btn btn-secondary btn-lg">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Magical Memories?</h2>
            <p>Book your party today and give your child an unforgettable celebration!</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Book Your Party
              </Link>
              <Link to="/calendar" className="btn btn-outline btn-lg">
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
