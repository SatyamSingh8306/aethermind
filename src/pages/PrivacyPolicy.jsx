import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaCookieBite, FaUserCog } from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import '../styles/LegalPages.css';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaShieldAlt />,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, company details)",
        "Usage data and analytics",
        "Device and browser information",
        "Communication preferences"
      ]
    },
    {
      icon: <FaLock />,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To improve user experience",
        "To communicate with you about our services",
        "To comply with legal obligations"
      ]
    },
    {
      icon: <FaUserShield />,
      title: "Data Protection",
      content: [
        "Industry-standard encryption",
        "Regular security audits",
        "Access controls and authentication",
        "Secure data storage and transmission"
      ]
    },
    {
      icon: <FaDatabase />,
      title: "Data Retention",
      content: [
        "We retain data only as long as necessary",
        "Regular data cleanup procedures",
        "User data deletion upon request",
        "Compliance with data protection laws"
      ]
    },
    {
      icon: <FaCookieBite />,
      title: "Cookies and Tracking",
      content: [
        "Essential cookies for functionality",
        "Analytics cookies for improvement",
        "Marketing cookies with consent",
        "Cookie preferences management"
      ]
    },
    {
      icon: <FaUserCog />,
      title: "Your Rights",
      content: [
        "Access to your personal data",
        "Data correction and deletion",
        "Opt-out of marketing communications",
        "Data portability"
      ]
    }
  ];

  return (
    <div className="legal-page">
      <BackgroundAnimation />
      
      <section className="legal-hero">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="section-subtitle">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>

      <section className="legal-content">
        <div className="legal-container">
          <div className="legal-intro">
            <p>
              At AetherMind, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our AI services and solutions.
            </p>
          </div>

          <div className="legal-sections">
            {sections.map((section, index) => (
              <div key={index} className="legal-section">
                <div className="legal-section-header">
                  <div className="legal-icon">
                    {section.icon}
                  </div>
                  <h2>{section.title}</h2>
                </div>
                <ul className="legal-list">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="legal-contact">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <Link to="/contact" className="primary-btn">
              Contact Our Privacy Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy; 