import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <div className="error-balloons">
            <span className="balloon">🎈</span>
            <span className="balloon">🎈</span>
            <span className="balloon">🎈</span>
          </div>
          <h1>Oops! Party Not Found</h1>
          <p>
            Looks like this page got lost on the way to the party!
            Don't worry, we have plenty of other fun things to explore.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              Back to Home
            </Link>
            <Link to="/packages" className="btn btn-secondary btn-lg">
              View Packages
            </Link>
          </div>
          <div className="quick-links-grid">
            <Link to="/contact" className="quick-link-card">
              <span className="quick-link-icon">📞</span>
              <span className="quick-link-text">Contact Us</span>
            </Link>
            <Link to="/calendar" className="quick-link-card">
              <span className="quick-link-icon">📅</span>
              <span className="quick-link-text">Check Availability</span>
            </Link>
            <Link to="/faq" className="quick-link-card">
              <span className="quick-link-icon">❓</span>
              <span className="quick-link-text">FAQ</span>
            </Link>
            <Link to="/about" className="quick-link-card">
              <span className="quick-link-icon">ℹ️</span>
              <span className="quick-link-text">About Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
