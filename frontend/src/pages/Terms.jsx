import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LegalPages.css';

const Terms = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const currentLang = lang || i18n.language || 'en';

  return (
    <div className="legal-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Terms & Conditions</h1>
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
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using BeqaParty's services, you accept and agree to be bound by these
                  Terms and Conditions. If you do not agree with any part of these terms, you may not use
                  our services.
                </p>
              </section>

              <section>
                <h2>2. Booking and Reservations</h2>
                <h3>Making a Booking</h3>
                <ul>
                  <li>All bookings must be made by adults (18 years or older)</li>
                  <li>Bookings are subject to availability</li>
                  <li>A deposit may be required to confirm your reservation</li>
                  <li>Full payment is typically due before or on the party date</li>
                </ul>

                <h3>Booking Modifications</h3>
                <ul>
                  <li>Changes to bookings must be requested at least 7 days in advance</li>
                  <li>Modifications are subject to availability</li>
                  <li>Additional fees may apply for certain changes</li>
                </ul>
              </section>

              <section>
                <h2>3. Cancellation and Refund Policy</h2>
                <h3>Cancellations by Customer</h3>
                <ul>
                  <li><strong>More than 14 days before:</strong> Full refund</li>
                  <li><strong>7-14 days before:</strong> 50% refund</li>
                  <li><strong>Less than 7 days:</strong> No refund</li>
                  <li>Deposits are non-refundable unless cancelled more than 14 days in advance</li>
                </ul>

                <h3>Cancellations by BeqaParty</h3>
                <p>
                  In rare cases where we must cancel, you will receive a full refund or the option to
                  reschedule at no additional cost.
                </p>
              </section>

              <section>
                <h2>4. Payment Terms</h2>
                <ul>
                  <li>Prices are quoted in US Dollars or Georgian Lari</li>
                  <li>Prices include all taxes unless otherwise stated</li>
                  <li>Payment can be made via cash, credit card, or bank transfer</li>
                  <li>Additional charges may apply for extra guests or services</li>
                  <li>We reserve the right to change prices with reasonable notice</li>
                </ul>
              </section>

              <section>
                <h2>5. Party Rules and Conduct</h2>
                <h3>Customer Responsibilities</h3>
                <ul>
                  <li>Supervise children at all times during the party</li>
                  <li>Respect our venue, staff, and other guests</li>
                  <li>Follow safety guidelines and instructions</li>
                  <li>Report any accidents or incidents immediately</li>
                  <li>Leave the venue in good condition</li>
                </ul>

                <h3>Prohibited Activities</h3>
                <ul>
                  <li>Smoking, alcohol, or illegal substances</li>
                  <li>Bringing outside entertainment without prior approval</li>
                  <li>Damaging property or equipment</li>
                  <li>Unsafe behavior or activities</li>
                </ul>
              </section>

              <section>
                <h2>6. Liability and Insurance</h2>
                <p>
                  While we take every precaution to ensure safety, BeqaParty is not liable for:
                </p>
                <ul>
                  <li>Personal injuries (except where caused by our negligence)</li>
                  <li>Lost, stolen, or damaged personal property</li>
                  <li>Accidents resulting from failure to follow safety guidelines</li>
                </ul>
                <p>
                  Parents/guardians are responsible for their children's safety and behavior. We recommend
                  having adequate personal insurance coverage.
                </p>
              </section>

              <section>
                <h2>7. Photography and Media</h2>
                <p>
                  We may take photos and videos during parties for promotional purposes. By booking with us,
                  you consent to this use unless you explicitly opt out in writing. We respect your privacy
                  and will not use images inappropriately.
                </p>
              </section>

              <section>
                <h2>8. Food and Allergies</h2>
                <ul>
                  <li>Inform us of any food allergies or dietary restrictions in advance</li>
                  <li>We will make reasonable accommodations but cannot guarantee allergen-free environments</li>
                  <li>Parents are responsible for monitoring their children's food consumption</li>
                  <li>Outside food may be allowed depending on the package</li>
                </ul>
              </section>

              <section>
                <h2>9. Intellectual Property</h2>
                <p>
                  All content on our website and in our materials is protected by copyright and other
                  intellectual property rights. You may not reproduce, distribute, or use our content
                  without permission.
                </p>
              </section>

              <section>
                <h2>10. Force Majeure</h2>
                <p>
                  We are not liable for failure to perform due to circumstances beyond our reasonable
                  control, including natural disasters, pandemics, government actions, or other unforeseen
                  events. In such cases, we will work with you to reschedule or provide a refund.
                </p>
              </section>

              <section>
                <h2>11. Governing Law</h2>
                <p>
                  These terms are governed by the laws of Georgia. Any disputes will be resolved in the
                  courts of Georgia.
                </p>
              </section>

              <section>
                <h2>12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be posted on our
                  website with an updated date. Continued use of our services constitutes acceptance of
                  modified terms.
                </p>
              </section>

              <section>
                <h2>13. Contact Information</h2>
                <p>
                  For questions about these Terms & Conditions, please contact us:
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
                  <Link to={`/${currentLang}/privacy`}>Privacy Policy</Link>
                  <Link to={`/${currentLang}/contact`}>Contact Us</Link>
                  <Link to={`/${currentLang}/faq`}>FAQ</Link>
                  <Link to={`/${currentLang}/about`}>About Us</Link>
                </nav>
              </div>

              <div className="sidebar-card highlight">
                <h3>Need Help?</h3>
                <p>If you have questions about our terms, we're here to help.</p>
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

export default Terms;
