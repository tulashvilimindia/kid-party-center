import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTerm } from '../services/api';
import './LegalPages.css';

const Terms = () => {
  const [termData, setTermData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const currentLang = lang || i18n.language || 'en';

  useEffect(() => {
    const fetchTermData = async () => {
      try {
        const response = await getTerm();
        setTermData(response.data);
      } catch (error) {
        console.error('Error fetching terms data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTermData();
  }, [i18n.language]);

  // Get terms texts with fallback
  const texts = termData?.conditions || {};

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="legal-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">{texts.page_title || 'Terms & Conditions'}</h1>
          <p className="page-subtitle">
            {texts.page_subtitle || 'Last updated: December 2024'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="legal-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="legal-text">
              {/* Section 1 */}
              <section>
                <h2>{texts.sec_1_title || '1. Acceptance of Terms'}</h2>
                <p>
                  {texts.sec_1_p1 || 'By accessing and using BeqaParty\'s services, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.'}
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2>{texts.sec_2_title || '2. Booking and Reservations'}</h2>
                <h3>{texts.sec_2_a_title || 'Making a Booking'}</h3>
                <ul>
                  <li>{texts.sec_2_a_li_1 || 'All bookings must be made by adults (18 years or older)'}</li>
                  <li>{texts.sec_2_a_li_2 || 'Bookings are subject to availability'}</li>
                  <li>{texts.sec_2_a_li_3 || 'A deposit may be required to confirm your reservation'}</li>
                  <li>{texts.sec_2_a_li_4 || 'Full payment is typically due before or on the party date'}</li>
                </ul>

                <h3>{texts.sec_2_b_title || 'Booking Modifications'}</h3>
                <ul>
                  <li>{texts.sec_2_b_li_1 || 'Changes to bookings must be requested at least 7 days in advance'}</li>
                  <li>{texts.sec_2_b_li_2 || 'Modifications are subject to availability'}</li>
                  <li>{texts.sec_2_b_li_3 || 'Additional fees may apply for certain changes'}</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2>{texts.sec_3_title || '3. Cancellation and Refund Policy'}</h2>
                <h3>{texts.sec_3_a_title || 'Cancellations by Customer'}</h3>
                <ul>
                  <li>
                    <strong>{texts.sec_3_a_li_1_prefix || 'More than 14 days before'}:</strong> {texts.sec_3_a_li_1_value || 'Full refund'}
                  </li>
                  <li>
                    <strong>{texts.sec_3_a_li_2_prefix || '7-14 days before'}:</strong> {texts.sec_3_a_li_2_value || '50% refund'}
                  </li>
                  <li>
                    <strong>{texts.sec_3_a_li_3_prefix || 'Less than 7 days'}:</strong> {texts.sec_3_a_li_3_value || 'No refund'}
                  </li>
                  <li>{texts.sec_3_a_li_4 || 'Deposits are non-refundable unless cancelled more than 14 days in advance'}</li>
                </ul>

                <h3>{texts.sec_3_b_title || 'Cancellations by BeqaParty'}</h3>
                <p>
                  {texts.sec_3_b_p1 || 'In rare cases where we must cancel, you will receive a full refund or the option to reschedule at no additional cost.'}
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2>{texts.sec_4_title || '4. Payment Terms'}</h2>
                <ul>
                  <li>{texts.sec_4_li_1 || 'Prices are quoted in US Dollars or Georgian Lari'}</li>
                  <li>{texts.sec_4_li_2 || 'Prices include all taxes unless otherwise stated'}</li>
                  <li>{texts.sec_4_li_3 || 'Payment can be made via cash, credit card, or bank transfer'}</li>
                  <li>{texts.sec_4_li_4 || 'Additional charges may apply for extra guests or services'}</li>
                  <li>{texts.sec_4_li_5 || 'We reserve the right to change prices with reasonable notice'}</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2>{texts.sec_5_title || '5. Party Rules and Conduct'}</h2>
                <h3>{texts.sec_5_a_title || 'Customer Responsibilities'}</h3>
                <ul>
                  <li>{texts.sec_5_a_li_1 || 'Supervise children at all times during the party'}</li>
                  <li>{texts.sec_5_a_li_2 || 'Respect our venue, staff, and other guests'}</li>
                  <li>{texts.sec_5_a_li_3 || 'Follow safety guidelines and instructions'}</li>
                  <li>{texts.sec_5_a_li_4 || 'Report any accidents or incidents immediately'}</li>
                  <li>{texts.sec_5_a_li_5 || 'Leave the venue in good condition'}</li>
                </ul>

                <h3>{texts.sec_5_b_title || 'Prohibited Activities'}</h3>
                <ul>
                  <li>{texts.sec_5_b_li_1 || 'Smoking, alcohol, or illegal substances'}</li>
                  <li>{texts.sec_5_b_li_2 || 'Bringing outside entertainment without prior approval'}</li>
                  <li>{texts.sec_5_b_li_3 || 'Damaging property or equipment'}</li>
                  <li>{texts.sec_5_b_li_4 || 'Unsafe behavior or activities'}</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2>{texts.sec_6_title || '6. Liability and Insurance'}</h2>
                <p>
                  {texts.sec_6_p1 || 'While we take every precaution to ensure safety, BeqaParty is not liable for:'}
                </p>
                <ul>
                  <li>{texts.sec_6_li_1 || 'Personal injuries (except where caused by our negligence)'}</li>
                  <li>{texts.sec_6_li_2 || 'Lost, stolen, or damaged personal property'}</li>
                  <li>{texts.sec_6_li_3 || 'Accidents resulting from failure to follow safety guidelines'}</li>
                </ul>
                <p>
                  {texts.sec_6_p2 || 'Parents/guardians are responsible for their children\'s safety and behavior. We recommend having adequate personal insurance coverage.'}
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2>{texts.sec_7_title || '7. Photography and Media'}</h2>
                <p>
                  {texts.sec_7_p1 || 'We may take photos and videos during parties for promotional purposes. By booking with us, you consent to this use unless you explicitly opt out in writing. We respect your privacy and will not use images inappropriately.'}
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2>{texts.sec_8_title || '8. Food and Allergies'}</h2>
                <ul>
                  <li>{texts.sec_8_li_1 || 'Inform us of any food allergies or dietary restrictions in advance'}</li>
                  <li>{texts.sec_8_li_2 || 'We will make reasonable accommodations but cannot guarantee allergen-free environments'}</li>
                  <li>{texts.sec_8_li_3 || 'Parents are responsible for monitoring their children\'s food consumption'}</li>
                  <li>{texts.sec_8_li_4 || 'Outside food may be allowed depending on the package'}</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section>
                <h2>{texts.sec_9_title || '9. Intellectual Property'}</h2>
                <p>
                  {texts.sec_9_p1 || 'All content on our website and in our materials is protected by copyright and other intellectual property rights. You may not reproduce, distribute, or use our content without permission.'}
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2>{texts.sec_10_title || '10. Force Majeure'}</h2>
                <p>
                  {texts.sec_10_p1 || 'We are not liable for failure to perform due to circumstances beyond our reasonable control, including natural disasters, pandemics, government actions, or other unforeseen events. In such cases, we will work with you to reschedule or provide a refund.'}
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2>{texts.sec_11_title || '11. Governing Law'}</h2>
                <p>
                  {texts.sec_11_p1 || 'These terms are governed by the laws of Georgia. Any disputes will be resolved in the courts of Georgia.'}
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2>{texts.sec_12_title || '12. Changes to Terms'}</h2>
                <p>
                  {texts.sec_12_p1 || 'We reserve the right to modify these terms at any time. Changes will be posted on our website with an updated date. Continued use of our services constitutes acceptance of modified terms.'}
                </p>
              </section>

              {/* Section 13 */}
              <section>
                <h2>{texts.sec_13_title || '13. Contact Information'}</h2>
                <p>
                  {texts.sec_13_p1 || 'For questions about these Terms & Conditions, please contact us:'}
                </p>
                <ul>
                  <li>
                    {texts.sec_13_li_1_label || 'Email:'}{' '}
                    <a href={`mailto:${texts.sec_13_email || 'info@beqaparty.ge'}`}>
                      {texts.sec_13_email || 'info@beqaparty.ge'}
                    </a>
                  </li>
                  <li>
                    {texts.sec_13_li_2_label || 'Phone:'}{' '}
                    <a href={`tel:${texts.sec_13_phone?.replace(/\s/g, '') || '+995577123456'}`}>
                      {texts.sec_13_phone || '+995 577 123 456'}
                    </a>
                  </li>
                  <li>
                    {texts.sec_13_li_3_label || 'Address:'} {texts.sec_13_address || 'Batumi, Georgia'}
                  </li>
                </ul>
              </section>
            </div>

            <aside className="legal-sidebar">
              <div className="sidebar-card">
                <h3>{texts.sidebar_quick_links_title || 'Quick Links'}</h3>
                <nav className="sidebar-nav">
                  <Link to={`/${currentLang}/privacy`}>{texts.sidebar_link_privacy || 'Privacy Policy'}</Link>
                  <Link to={`/${currentLang}/contact`}>{texts.sidebar_link_contact || 'Contact Us'}</Link>
                  <Link to={`/${currentLang}/faq`}>{texts.sidebar_link_faq || 'FAQ'}</Link>
                  <Link to={`/${currentLang}/about`}>{texts.sidebar_link_about || 'About Us'}</Link>
                </nav>
              </div>

              <div className="sidebar-card highlight">
                <h3>{texts.sidebar_help_title || 'Need Help?'}</h3>
                <p>{texts.sidebar_help_text || 'If you have questions about our terms, we\'re here to help.'}</p>
                <Link to={`/${currentLang}/contact`} className="btn btn-primary btn-sm btn-block">
                  {texts.sidebar_help_btn || 'Contact Us'}
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
