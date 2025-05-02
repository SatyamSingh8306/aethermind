import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackgroundAnimation from '../components/BackgroundAnimation'

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="services-page">
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1 className="section-title">Our AI Services</h1>
          <p className="section-subtitle">
            Discover how AetherMind's cutting-edge AI solutions can transform your business operations,
            enhance productivity, and drive innovation.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="service-cards">
            <div className="service-card" id="automation">
              <div className="service-card-header">
                <div className="service-icon">🤖</div>
                <h3 className="service-title">AI-Powered Automation</h3>
              </div>
              <p className="service-description">
                Eliminate repetitive tasks and streamline workflows with our intelligent automation 
                solutions that adapt to your unique business needs.
              </p>
              <div className="service-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Reduce operational costs by up to 40%</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Free up employee time for higher-value work</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Minimize human error and inconsistencies</span>
                </div>
              </div>
              <Link to="/contact" className="secondary-btn">Learn More</Link>
            </div>

            <div className="service-card" id="chatbot">
              <div className="service-card-header">
                <div className="service-icon">💬</div>
                <h3 className="service-title">AI Chatbots & Assistants</h3>
              </div>
              <p className="service-description">
                Deploy intelligent conversational agents that understand context, provide accurate responses,
                and enhance customer engagement across all channels.
              </p>
              <div className="service-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>24/7 customer support and engagement</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Personalized user interactions</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Seamless integration with existing platforms</span>
                </div>
              </div>
              <Link to="/contact" className="secondary-btn">Learn More</Link>
            </div>

            <div className="service-card" id="analytics">
              <div className="service-card-header">
                <div className="service-icon">📊</div>
                <h3 className="service-title">Intelligent Analytics</h3>
              </div>
              <p className="service-description">
                Transform raw data into actionable insights with our AI-powered analytics solutions 
                that identify patterns, trends, and opportunities.
              </p>
              <div className="service-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Data-driven decision making</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Predictive analytics and forecasting</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Custom dashboards and reporting</span>
                </div>
              </div>
              <Link to="/contact" className="secondary-btn">Learn More</Link>
            </div>

            <div className="service-card" id="custom">
              <div className="service-card-header">
                <div className="service-icon">🛠️</div>
                <h3 className="service-title">Custom AI Solutions</h3>
              </div>
              <p className="service-description">
                We develop tailored AI solutions designed specifically for your unique business 
                challenges and objectives, leveraging cutting-edge technologies.
              </p>
              <div className="service-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Tailored to your specific industry</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>End-to-end development and implementation</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Ongoing support and optimization</span>
                </div>
              </div>
              <Link to="/contact" className="secondary-btn">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business with AI?</h2>
            <p>Schedule a free consultation with our experts to discover how AetherMind can elevate your business.</p>
            <Link to="/contact" className="primary-btn">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage