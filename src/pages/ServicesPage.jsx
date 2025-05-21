import React from 'react'
import { Link } from 'react-router-dom'
import { FaRobot, FaChartLine, FaBrain, FaCogs, FaCheck, FaArrowRight } from 'react-icons/fa'
import BackgroundAnimation from '../components/BackgroundAnimation'
import '../styles/ServicesPage.css'

const ServicesPage = () => {
  const services = [
    {
      icon: <FaRobot />,
      title: "AI-Powered Automation",
      description: "Transform your business operations with intelligent automation solutions that learn and adapt to your needs.",
      benefits: [
        "Reduce manual tasks by up to 80%",
        "24/7 operational efficiency",
        "Error-free processing",
        "Scalable automation workflows"
      ]
    },
    {
      icon: <FaBrain />,
      title: "AI Chatbots & Assistants",
      description: "Create intelligent conversational agents that understand context, learn from interactions, and provide personalized assistance.",
      benefits: [
        "Natural language understanding",
        "Multi-channel deployment",
        "Continuous learning capabilities",
        "Seamless human handoff"
      ]
    },
    {
      icon: <FaChartLine />,
      title: "Intelligent Analytics",
      description: "Unlock actionable insights from your data with advanced AI analytics and predictive modeling.",
      benefits: [
        "Real-time data processing",
        "Predictive trend analysis",
        "Custom reporting dashboards",
        "Automated insights generation"
      ]
    },
    {
      icon: <FaCogs />,
      title: "Custom AI Solutions",
      description: "Tailored AI solutions designed to address your specific business challenges and opportunities.",
      benefits: [
        "Industry-specific expertise",
        "End-to-end implementation",
        "Ongoing support & maintenance",
        "Scalable architecture"
      ]
    }
  ]

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
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card-header">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h2 className="service-title">{service.title}</h2>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-benefits">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="secondary-btn">
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