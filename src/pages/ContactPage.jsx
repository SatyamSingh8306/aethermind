import { useState, useEffect } from 'react'
import BackgroundAnimation from '../components/BackgroundAnimation'

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })

  const [formStatus, setFormStatus] = useState({
    message: '',
    isError: false,
    isSubmitted: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // In a real application, this would connect to your backend API
    // For demo purposes, we'll simulate a successful submission
    
    // Show loading state
    setFormStatus({
      message: 'Sending your message...',
      isError: false,
      isSubmitted: false
    })
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        message: 'Thank you! Your message has been sent successfully.',
        isError: false,
        isSubmitted: true
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      })
    }, 1500)
  }

  return (
    <div className="contact-page">
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">
            Have questions or ready to start your AI journey? Reach out to our team and
            let's discuss how AetherMind can transform your business.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                We'd love to hear from you. Whether you have a question about our services,
                pricing, or just want to learn more about how AI can benefit your business,
                our team is here to help.
              </p>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-detail">
                  <strong>Email</strong>
                  <p>aicinema69@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-detail">
                  <strong>Phone</strong>
                  <p>+91 9918437706</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-detail">
                  <strong>Headquarters</strong>
                  <p>123 AI Boulevard, Suite 100<br/>San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h2>Send Us a Message</h2>
              {formStatus.message && (
                <div className={`form-message ${formStatus.isError ? 'error' : 'success'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary" disabled={formStatus.isSubmitted}>
                  {formStatus.isSubmitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Our Location</h2>
          <div className="map-container">
            <iframe
              title="AetherMind Headquarters"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.138053771816!2d-122.4194155846822!3d37.77492997975948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage