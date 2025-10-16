import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackgroundAnimation from '../components/BackgroundAnimation'
import '../styles/CareersPage.css'

const CareersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="careers-page">
      <BackgroundAnimation />

      <section className="careers-hero">
        <div className="container">
          <h1 className="careers-title">Careers at AetherMind</h1>
          <p className="careers-subtitle">
            We appreciate your interest in joining our team. At the moment, we do not have any open positions.
          </p>
        </div>
      </section>

      <section className="careers-status">
        <div className="container">
          <div className="status-card">
            <h2>No Open Roles Currently</h2>
            <p>
              We are not actively hiring right now. Please check back later or reach out to us if you would like to
              share your portfolio for future opportunities.
            </p>
            <div className="status-actions">
              <Link to="/contact" className="primary-btn">Contact Us</Link>
              <Link to="/about" className="secondary-btn">Learn About AetherMind</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CareersPage
