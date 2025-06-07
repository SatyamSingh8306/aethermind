import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { FaCheckCircle, FaClock, FaUserTie, FaChartLine, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import '../styles/DemoPage.css';

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState('form');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: <FaUserTie />,
      title: "Personalized Demo",
      description: "Get a customized walkthrough of our solutions tailored to your business needs"
    },
    {
      icon: <FaChartLine />,
      title: "ROI Analysis",
      description: "Understand how our AI solutions can impact your bottom line"
    },
    {
      icon: <FaShieldAlt />,
      title: "Security Overview",
      description: "Learn about our enterprise-grade security and compliance measures"
    },
    {
      icon: <FaHeadset />,
      title: "Expert Support",
      description: "Access to our team of AI specialists throughout your journey"
    }
  ];

  const testimonials = [
    {
      quote: "AetherMind's AI solutions transformed our business operations. The demo was incredibly insightful.",
      author: "Sarah Johnson",
      position: "CTO, TechCorp",
      company: "TechCorp"
    },
    {
      quote: "The personalized demo helped us understand exactly how we could leverage AI in our workflow.",
      author: "Michael Chen",
      position: "Operations Director",
      company: "Global Solutions Inc."
    }
  ];

  return (
    <div className="demo-page">
      <BackgroundAnimation />
      
      <section className="demo-hero">
        <div className="container">
          <h1 className="section-title">Experience AetherMind's AI Solutions</h1>
          <p className="section-subtitle">
            Schedule a personalized demo and discover how our AI-powered solutions can transform your business operations.
          </p>
          <div className="demo-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Businesses Transformed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Expert Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-content">
        <div className="container">
          <div className="demo-tabs">
            <button 
              className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              Schedule Demo
            </button>
            <button 
              className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              What to Expect
            </button>
          </div>

          {activeTab === 'form' ? (
            <div className="demo-form-container">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScWF8dnfkVmlIOezlxvEhGJRfAxyO1oUEHjPNkL9GTbTGpA5g/viewform?embedded=true" 
                width="100%" 
                height="1200" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
              >
                Loading…
              </iframe>
            </div>
          ) : (
            <div className="demo-info">
              <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-card">
                    <div className="benefit-icon">{benefit.icon}</div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                ))}
              </div>

              <div className="demo-process">
                <h2>Demo Process</h2>
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <h3>Schedule</h3>
                    <p>Choose a convenient time for your demo</p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <h3>Consultation</h3>
                    <p>Discuss your business needs and challenges</p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <h3>Live Demo</h3>
                    <p>Experience our solutions in action</p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">4</div>
                    <h3>Next Steps</h3>
                    <p>Get a customized implementation plan</p>
                  </div>
                </div>
              </div>

              <div className="testimonials-section">
                <h2>What Our Clients Say</h2>
                <div className="testimonials-grid">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                      <div className="quote-icon">"</div>
                      <p className="testimonial-quote">{testimonial.quote}</p>
                      <div className="testimonial-author">
                        <strong>{testimonial.author}</strong>
                        <span>{testimonial.position}</span>
                        <span className="company">{testimonial.company}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="demo-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Join hundreds of businesses that have already revolutionized their operations with AetherMind.</p>
            <div className="cta-buttons">
              <button 
                className="primary-btn"
                onClick={() => setActiveTab('form')}
              >
                Schedule Demo Now
              </button>
              <Link to="/contact" className="secondary-btn">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage; 