import { useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import BackgroundAnimation from '../components/BackgroundAnimation'

const HeroSection = memo(() => (
  <section className="hero-section">
    <div className="hero-content">
      <h1 className="hero-title">Intelligent AI Solutions for Next-Gen Business</h1>
      <p className="hero-subtitle">
        AetherMind provides cutting-edge AI-powered automation, analytics, and intelligent agents to transform your business processes.
      </p>
      <div className="hero-cta-group">
        <Link to="/services" className="primary-btn">Explore Services</Link>
        <Link to="/contact" className="secondary-btn">Schedule Demo</Link>
      </div>
    </div>
  </section>
))

const HomePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="home-page">
      <BackgroundAnimation />
      <HeroSection />
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Our Capabilities</h2>
          <p className="section-subtitle">
            Explore how AetherMind's AI solutions can revolutionize your workflow, automate mundane tasks, and uncover valuable insights.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI-Powered Automation</h3>
              <p className="feature-description">
                Eliminate repetitive tasks with intelligent automation that learns and adapts to your specific business needs.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">Custom AI Agents</h3>
              <p className="feature-description">
                Deploy intelligent conversational agents that understand context, provide accurate responses, and enhance customer engagement.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Intelligent Analytics</h3>
              <p className="feature-description">
                Turn raw data into actionable insights with AI-powered analytics that identify patterns, trends, and opportunities.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Workflow Integration</h3>
              <p className="feature-description">
                Seamlessly integrate our AI solutions with your existing tools and workflows for maximum efficiency and minimal disruption.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3 className="feature-title">Continuous Learning</h3>
              <p className="feature-description">
                Our AI systems evolve and improve over time, learning from interactions to deliver increasingly accurate and valuable results.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3 className="feature-title">Custom Solutions</h3>
              <p className="feature-description">
                We develop tailored AI solutions designed specifically for your unique business challenges and objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting started with AetherMind is simple. Our structured approach ensures you get the most value from our AI services.
          </p>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>We start by understanding your business needs, challenges, and objectives to identify the right AI solution.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Strategy & Design</h3>
              <p>Our team develops a tailored strategy and solution design focused on delivering measurable business outcomes.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Implementation</h3>
              <p>We build and deploy your custom AI solution with minimal disruption to your existing operations.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Optimization</h3>
              <p>Continuous monitoring and refinement ensure your AI solution learns, adapts, and improves over time.</p>
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

export default HomePage