import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LegalPages.css';

const Privacy = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const currentLang = lang || i18n.language || 'en';

  return (
    <div className="legal-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Privacy Policy</h1>
          <p className="page-subtitle">
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="legal-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="legal-text">
              <section>
                <h2>1. Introduction</h2>
                <p>
                  BeqaParty ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you visit our
                  website or use our services.
                </p>
              </section>

              <section>
                <h2>2. Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>We may collect personal information that you provide to us, including:</p>
                <ul>
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Payment and billing information</li>
                  <li>Party booking details (date, number of guests, package preferences)</li>
                  <li>Child's name and age for party planning purposes</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect:</p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process and manage your party bookings</li>
                  <li>Communicate with you about your reservations</li>
                  <li>Send you confirmations, updates, and reminders</li>
                  <li>Improve our services and customer experience</li>
                  <li>Process payments and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2>4. Information Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul>
                  <li><strong>Service Providers:</strong> Third parties who help us operate our business</li>
                  <li><strong>Payment Processors:</strong> To process transactions securely</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                </ul>
              </section>

              <section>
                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal
                  information. However, no method of transmission over the internet is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2>7. Children's Privacy</h2>
                <p>
                  While we provide services for children's parties, we do not knowingly collect personal
                  information directly from children under 13. All bookings and communications should be
                  handled by parents or legal guardians.
                </p>
              </section>

              <section>
                <h2>8. Cookies</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience. You can control cookie
                  preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2>9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by
                  posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2>10. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul>
                  <li>Email: <a href="mailto:info@beqaparty.ge">info@beqaparty.ge</a></li>
                  <li>Phone: <a href="tel:+995577123456">+995 577 123 456</a></li>
                  <li>Address: Batumi, Georgia</li>
                </ul>
              </section>
            </div>

            <aside className="legal-sidebar">
              <div className="sidebar-card">
                <h3>Quick Links</h3>
                <nav className="sidebar-nav">
                  <Link to={`/${currentLang}/terms`}>Terms & Conditions</Link>
                  <Link to={`/${currentLang}/contact`}>Contact Us</Link>
                  <Link to={`/${currentLang}/faq`}>FAQ</Link>
                  <Link to={`/${currentLang}/about`}>About Us</Link>
                </nav>
              </div>

              <div className="sidebar-card highlight">
                <h3>Questions?</h3>
                <p>If you have concerns about your privacy, please reach out to us.</p>
                <Link to={`/${currentLang}/contact`} className="btn btn-primary btn-sm btn-block">
                  Contact Us
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
