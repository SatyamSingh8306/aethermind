import React from 'react'
import { Link } from 'react-router-dom'
import { FaRobot, FaChartLine, FaBrain, FaCogs, FaCheck, FaArrowRight } from 'react-icons/fa'
import BackgroundAnimation from '../components/BackgroundAnimation'
import '../styles/ServicesPage.css'
import { servicesData } from '../data/servicesData'

const ServicesPage = () => {
  return (
    <div className="services-page">
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section className="services-hero">
        <h1 className="section-title">AI Solutions for Tomorrow's Challenges</h1>
        <p className="section-subtitle">
          Discover how our cutting-edge AI solutions can transform your business operations, 
          enhance customer experiences, and drive innovation in your industry.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="service-cards">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-header">
                <div className="service-icon">
                  {service.id === 'ai-automation' && <FaRobot />}
                  {service.id === 'ai-chatbots' && <FaBrain />}
                  {service.id === 'ai-analytics' && <FaChartLine />}
                  {service.id === 'custom-ai' && <FaCogs />}
                </div>
                <h2 className="service-title">{service.title}</h2>
              </div>
              <p className="service-tagline">{service.tagline}</p>
              <p className="service-description">{service.description}</p>
              <div className="service-benefits">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="benefit-item">
                    <FaCheck className="benefit-icon" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to={`/services/${service.id}`} className="secondary-btn">
                Learn More <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Business?</h2>
          <p>
            Schedule a consultation with our AI experts to discover how we can help you 
            leverage the power of artificial intelligence to achieve your business goals.
          </p>
          <Link to="/contact" className="primary-btn">
            Get Started <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage