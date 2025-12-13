import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const currentLang = lang || i18n.language || 'en';

  const faqs = [
    {
      question: 'How far in advance should I book a party?',
      answer: 'We recommend booking at least 2-3 weeks in advance, especially for weekends. However, we can sometimes accommodate last-minute bookings depending on availability.'
    },
    {
      question: 'What is included in the party packages?',
      answer: 'Each package includes venue rental, decorations, basic entertainment, and party coordination. Specific inclusions vary by package - check our Packages page for detailed information.'
    },
    {
      question: 'Can I bring my own food and cake?',
      answer: 'Yes! You are welcome to bring your own cake and food. We also offer catering options through our menu if you prefer.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 7+ days before the event receive a full refund. Cancellations within 7 days may be subject to a cancellation fee. We recommend reviewing our Terms & Conditions for full details.'
    },
    {
      question: 'How many children can attend?',
      answer: 'This depends on the package you choose. Most packages accommodate 10-30 children, but we can arrange larger or smaller parties upon request.'
    },
    {
      question: 'Do you provide entertainment?',
      answer: 'Yes! All our packages include age-appropriate entertainment such as games, activities, and supervision by our trained staff.'
    },
    {
      question: 'Can I customize a package?',
      answer: 'Absolutely! We love creating custom experiences. Contact us to discuss your specific needs and preferences.'
    },
    {
      question: 'What age groups do you cater to?',
      answer: 'We specialize in parties for children aged 3-12 years old. Each party is tailored to be age-appropriate and engaging.'
    },
    {
      question: 'Is the venue safe for children?',
      answer: 'Safety is our top priority. Our venue is childproofed, regularly cleaned, and all activities are supervised by trained staff.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, credit cards, and bank transfers. A deposit is typically required to confirm your booking.'
    },
    {
      question: 'Can parents stay during the party?',
      answer: 'Parents are welcome to stay and enjoy the party with their children! We have comfortable seating areas for adults.'
    },
    {
      question: 'What if it rains on our party day?',
      answer: 'All our parties are held indoors in our climate-controlled venue, so weather is never an issue!'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="text-gradient">Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find answers to common questions about our party services
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-container">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-sidebar">
              <div className="help-card">
                <h3>Still Have Questions?</h3>
                <p>Can't find the answer you're looking for? Our team is here to help!</p>
                <Link to={`/${currentLang}/contact`} className="btn btn-primary btn-block">
                  Contact Us
                </Link>
              </div>

              <div className="help-card">
                <h3>Quick Links</h3>
                <div className="quick-links">
                  <Link to={`/${currentLang}/packages`}>View Packages</Link>
                  <Link to={`/${currentLang}/calculator`}>Price Calculator</Link>
                  <Link to={`/${currentLang}/calendar`}>Check Availability</Link>
                  <Link to={`/${currentLang}/about`}>About Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
