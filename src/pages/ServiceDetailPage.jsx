import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import BackgroundAnimation from '../components/BackgroundAnimation'
import { servicesData } from '../data/servicesData'
import '../styles/ServiceDetailPage.css'

const ServiceDetailPage = () => {
  const { serviceId } = useParams()

  const service = useMemo(() => servicesData.find((entry) => entry.id === serviceId), [serviceId])

  if (!service) {
    return (
      <div className="service-detail-page">
        <BackgroundAnimation />
        <section className="service-detail-empty">
          <div className="service-detail-empty-card">
            <h1>Service not found</h1>
            <p>The service you are looking for is unavailable or has been moved.</p>
            <Link to="/services" className="service-detail-back">
              <FaArrowLeft /> Back to Services
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="service-detail-page">
      <BackgroundAnimation />
      <section
        className="service-detail-hero"
        style={service.heroImage ? { backgroundImage: `linear-gradient(135deg, rgba(10, 12, 29, 0.85), rgba(19, 21, 45, 0.75)), url(${service.heroImage})` } : undefined}
      >
        <div className="service-detail-hero-content">
          <Link to="/services" className="service-detail-back">
            <FaArrowLeft /> Back to Services
          </Link>
          <h1>{service.title}</h1>
          <p className="service-detail-tagline">{service.tagline}</p>
          <div className="service-detail-metrics">
            {service.metrics?.map((metric) => (
              <div key={metric.label} className="service-detail-metric">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-body">
        <div className="service-detail-overview">
          <h2>Why this service</h2>
          <p>{service.description}</p>
          <div className="service-detail-outcomes">
            {service.outcomes.map((outcome) => (
              <div key={outcome} className="service-detail-outcome">
                <FaCheckCircle />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="service-detail-grid">
          <div className="service-detail-card">
            <h3>Key Capabilities</h3>
            <ul>
              {service.modules.map((module) => (
                <li key={module}>
                  <FaCheckCircle />
                  <span>{module}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="service-detail-card">
            <h3>Implementation Benefits</h3>
            <ul>
              {service.benefits.map((benefit) => (
                <li key={benefit}>
                  <FaCheckCircle />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="service-detail-faq">
          <h3>Frequently Asked</h3>
          <div className="service-detail-faq-list">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="service-detail-faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="service-detail-cta">
          <div className="service-detail-cta-content">
            <h3>Ready to explore {service.title}?</h3>
            <p>Schedule a strategy session with our consultants to tailor this service to your roadmap.</p>
            <Link to="/contact" className="service-detail-cta-btn">
              Talk to our team <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage
