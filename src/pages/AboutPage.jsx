import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackgroundAnimation from '../components/BackgroundAnimation'
import ProfilePhoto from '../assets/profile_photo.jpg'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page">
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="section-title">About AetherMind</h1>
          <p className="section-subtitle">
            We're a team of AI specialists dedicated to creating intelligent solutions
            that empower businesses to thrive in the digital age.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                At AetherMind, we're on a mission to democratize artificial intelligence and make
                advanced AI technologies accessible to businesses of all sizes. We believe that AI
                should be a powerful tool that enhances human capabilities rather than replacing them.
              </p>
              <p>
                Our team of AI specialists, data scientists, and software engineers work together
                to create solutions that are not only technically sophisticated but also practical,
                ethical, and aligned with our clients' business objectives.
              </p>
              <p>
                Founded in 2023, AetherMind has quickly established itself as a trusted partner for
                businesses looking to harness the power of AI to drive innovation, efficiency, and growth.
              </p>
            </div>
            <div className="about-image">
              <img src="/api/placeholder/600/400" alt="AetherMind Team" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">
            These core principles guide everything we do at AetherMind.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Innovation</h3>
              <p className="feature-description">
                We constantly explore new technologies and approaches to solve complex problems.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Partnership</h3>
              <p className="feature-description">
                We work alongside our clients as true partners, invested in their success.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3 className="feature-title">Ethical AI</h3>
              <p className="feature-description">
                We develop AI solutions that uphold the highest ethical standards and promote fairness.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Excellence</h3>
              <p className="feature-description">
                We are committed to delivering exceptional quality in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (placeholder for now) */}
      <section className="team-section" id="team">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the minds behind AetherMind's innovative AI solutions.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="about-image">
                <img src={ProfilePhoto} alt="Team Member" />
              </div>
              <h3 className="feature-title">Satyam Singh</h3>
              <p className="feature-description">
                Co-founder & CEO
              </p>
            </div>
            
            <div className="feature-card">
              <div className="about-image">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/036/442/721/small_2x/ai-generated-portrait-of-a-young-man-no-facial-expression-facing-the-camera-isolated-white-background-ai-generative-photo.jpg" alt="Team Member" />
              </div>
              <h3 className="feature-title">Shivam</h3>
              <p className="feature-description">
                Co-founder & CTO
              </p>
            </div>
            
            <div className="feature-card">
              <div className="about-image">
                <img src={ProfilePhoto} alt="Team Member" />
              </div>
              <h3 className="feature-title">Satyam Singh</h3>
              <p className="feature-description">
                Lead AI Engineer
              </p>
            </div>
            
            <div className="feature-card">
              <div className="about-image">
                <img src={ProfilePhoto} alt="Team Member" />
              </div>
              <h3 className="feature-title">Agent</h3>
              <p className="feature-description">
                Head of Product
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Team</h2>
            <p>We're always looking for talented individuals who are passionate about AI and innovation.</p>
            <Link to="/about#careers" className="primary-btn">View Careers</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage