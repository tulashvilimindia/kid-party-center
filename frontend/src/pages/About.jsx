import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSiteSettings, getAbout } from '../services/api';
import './About.css';

const About = () => {
  const { t, i18n } = useTranslation('about');
  const { lang } = useParams();
  const [settings, setSettings] = useState(null);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentLang = lang || i18n.language || 'en';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, aboutData] = await Promise.all([
          getSiteSettings(),
          getAbout()
        ]);
        setSettings(settingsData.data);
        setAbout(aboutData.data);
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
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Get about texts with fallback
  const texts = about?.abouttext || {};

  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">{texts.page_title || 'About BeqaParty'}</h1>
          <p className="page-subtitle">
            {texts.page_subtitle || 'Creating magical memories for children in Batumi since 2020'}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <h2>{texts.story_title || 'Our Story'}</h2>
              <p>
                {texts.story_p1 || 'BeqaParty was founded with a simple mission: to create unforgettable party experiences for children in Batumi. We believe that every child deserves a magical celebration filled with joy, laughter, and wonderful memories.'}
              </p>
              <p>
                {texts.story_p2 || 'Over the years, we\'ve hosted hundreds of parties, each one unique and special. From themed adventures to custom celebrations, we work closely with parents to bring their vision to life and create the perfect party for their child.'}
              </p>
              <p>
                {texts.story_p3 || 'Our dedicated team of party planners, entertainers, and staff are passionate about what they do. We handle every detail, so you can relax and enjoy the celebration alongside your child.'}
              </p>
            </div>

            <div className="content-sidebar">
              <div className="stats-card">
                <div className="stat-item">
                  <span className="stat-number">{texts.stats_1_number || '500+'}</span>
                  <span className="stat-label">{texts.stats_1_label || 'Happy Parties'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{texts.stats_2_number || '10,000+'}</span>
                  <span className="stat-label">{texts.stats_2_label || 'Smiling Kids'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{texts.stats_3_number || '5+'}</span>
                  <span className="stat-label">{texts.stats_3_label || 'Years Experience'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="text-center">{texts.values_title || 'Our Values'}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">{texts.value_1_icon || '🎉'}</div>
              <h3>{texts.value_1_title || 'Fun First'}</h3>
              <p>{texts.value_1_desc || 'Every party is designed to maximize fun and create lasting memories for all children.'}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">{texts.value_2_icon || '🛡️'}</div>
              <h3>{texts.value_2_title || 'Safety'}</h3>
              <p>{texts.value_2_desc || 'Child safety is our top priority. All activities are supervised and our venue is secure.'}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">{texts.value_3_icon || '✨'}</div>
              <h3>{texts.value_3_title || 'Quality'}</h3>
              <p>{texts.value_3_desc || 'We use only high-quality materials, decorations, and food for all our parties.'}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">{texts.value_4_icon || '🤝'}</div>
              <h3>{texts.value_4_title || 'Personalized'}</h3>
              <p>{texts.value_4_desc || 'Every party is customized to match your child\'s interests and your family\'s preferences.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="text-center">{texts.team_title || 'Meet Our Team'}</h2>
          <p className="section-subtitle text-center">
            {texts.team_subtitle || 'Dedicated professionals who make the magic happen'}
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">{texts.team_1_avatar || '👨‍💼'}</div>
              <h4>{texts.team_1_name || 'Beqa Sulakvelidze'}</h4>
              <p className="member-role">{texts.team_1_role || 'Founder & CEO'}</p>
              <p className="member-bio">
                {texts.team_1_bio || 'Passionate about creating memorable experiences for children and families.'}
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">{texts.team_2_avatar || '👩‍🎨'}</div>
              <h4>{texts.team_2_name || 'Nino Beridze'}</h4>
              <p className="member-role">{texts.team_2_role || 'Event Coordinator'}</p>
              <p className="member-bio">
                {texts.team_2_bio || 'Expert in party planning with an eye for creative details and themes.'}
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">{texts.team_3_avatar || '🎭'}</div>
              <h4>{texts.team_3_name || 'Giorgi Kharadze'}</h4>
              <p className="member-role">{texts.team_3_role || 'Entertainment Director'}</p>
              <p className="member-bio">
                {texts.team_3_bio || 'Professional entertainer who brings joy and laughter to every party.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{texts.cta_title || 'Ready to Plan Your Party?'}</h2>
            <p>{texts.cta_subtitle || 'Let\'s create an unforgettable celebration for your child!'}</p>
            <div className="cta-buttons">
              <Link to={`/${currentLang}/packages`} className="btn btn-primary btn-lg">
                {texts.cta_btn_packages || 'View Packages'}
              </Link>
              <Link to={`/${currentLang}/contact`} className="btn btn-outline btn-lg">
                {texts.cta_btn_contact || 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
