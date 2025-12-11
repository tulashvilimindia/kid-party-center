import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSiteSettings } from '../services/api';
import './About.css';

const About = () => {
  const { t, i18n } = useTranslation('about');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSiteSettings();
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">About BeqaParty</h1>
          <p className="page-subtitle">
            Creating magical memories for children in Batumi since 2020
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <h2>Our Story</h2>
              <p>
                BeqaParty was founded with a simple mission: to create unforgettable party experiences
                for children in Batumi. We believe that every child deserves a magical celebration
                filled with joy, laughter, and wonderful memories.
              </p>
              <p>
                Over the years, we've hosted hundreds of parties, each one unique and special.
                From themed adventures to custom celebrations, we work closely with parents to
                bring their vision to life and create the perfect party for their child.
              </p>
              <p>
                Our dedicated team of party planners, entertainers, and staff are passionate about
                what they do. We handle every detail, so you can relax and enjoy the celebration
                alongside your child.
              </p>
            </div>

            <div className="content-sidebar">
              <div className="stats-card">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Parties</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Smiling Kids</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="text-center">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎉</div>
              <h3>Fun First</h3>
              <p>Every party is designed to maximize fun and create lasting memories for all children.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Safety</h3>
              <p>Child safety is our top priority. All activities are supervised and our venue is secure.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>We use only high-quality materials, decorations, and food for all our parties.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Personalized</h3>
              <p>Every party is customized to match your child's interests and your family's preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="text-center">Meet Our Team</h2>
          <p className="section-subtitle text-center">
            Dedicated professionals who make the magic happen
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>Beqa Sulakvelidze</h4>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                Passionate about creating memorable experiences for children and families.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🎨</div>
              <h4>Nino Beridze</h4>
              <p className="member-role">Event Coordinator</p>
              <p className="member-bio">
                Expert in party planning with an eye for creative details and themes.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">🎭</div>
              <h4>Giorgi Kharadze</h4>
              <p className="member-role">Entertainment Director</p>
              <p className="member-bio">
                Professional entertainer who brings joy and laughter to every party.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Plan Your Party?</h2>
            <p>Let's create an unforgettable celebration for your child!</p>
            <div className="cta-buttons">
              <Link to="/packages" className="btn btn-primary btn-lg">
                View Packages
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
