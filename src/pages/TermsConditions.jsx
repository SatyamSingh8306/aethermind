import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaHandshake, FaExclamationTriangle, FaUserLock, FaFileContract, FaBalanceScale } from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import '../styles/LegalPages.css';

const TermsConditions = () => {
  const sections = [
    {
      icon: <FaHandshake />,
      title: "Agreement to Terms",
      content: [
        "By accessing our services, you agree to these terms",
        "You must be at least 18 years old",
        "You must have legal authority to enter into agreements",
        "You agree to comply with all applicable laws"
      ]
    },
    {
      icon: <FaUserLock />,
      title: "User Responsibilities",
      content: [
        "Maintain accurate account information",
        "Protect your account credentials",
        "Use services in compliance with laws",
        "Report any security concerns"
      ]
    },
    {
      icon: <FaFileContract />,
      title: "Service Terms",
      content: [
        "Services are provided 'as is'",
        "We may modify services at any time",
        "Service availability is not guaranteed",
        "We reserve right to terminate services"
      ]
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Prohibited Activities",
      content: [
        "Unauthorized access attempts",
        "Data scraping or mining",
        "Service disruption or interference",
        "Violation of intellectual property rights"
      ]
    },
    {
      icon: <FaBalanceScale />,
      title: "Intellectual Property",
      content: [
        "All content is our property",
        "No unauthorized copying or distribution",
        "User content licensing terms",
        "Trademark and copyright protection"
      ]
    },
    {
      icon: <FaGavel />,
      title: "Limitation of Liability",
      content: [
        "We are not liable for indirect damages",
        "Service interruptions and data loss",
        "Third-party content and services",
        "Maximum liability limitations"
      ]
    }
  ];

  return (
    <div className="legal-page">
      <BackgroundAnimation />
      
      <section className="legal-hero">
        <h1 className="section-title">Terms & Conditions</h1>
        <p className="section-subtitle">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>

      <section className="legal-content">
        <div className="legal-container">
          <div className="legal-intro">
            <p>
              These Terms and Conditions govern your use of AetherMind's AI services and solutions. 
              Please read them carefully before using our services.
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
            <h2>Questions About Our Terms?</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact our legal team:
            </p>
            <Link to="/contact" className="primary-btn">
              Contact Legal Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions; 