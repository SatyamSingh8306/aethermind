import { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import BackgroundAnimation from '../components/BackgroundAnimation'
import { motion } from 'framer-motion';
import { Zap, Rocket } from 'lucide-react';

const HeroSection = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-3 py-1.5 rounded-full text-xs font-medium border border-cyan-500/30">
              <Zap className="w-3 h-3" />
              AI-Powered Innovation
            </div>

            <motion.h1
              className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Intelligent AI
              </span>
              <br />
              <span className="text-white">Solutions for</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Next-Gen Business
              </span>
            </motion.h1>

            <motion.p
              className="hero-subtitle text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            >
              AetherMind delivers cutting-edge AI automation, intelligent analytics, and autonomous agents that
              <span className="text-cyan-400 font-semibold"> transform your business processes</span> into competitive advantages.
            </motion.p>

            <motion.div
              className="hero-cta-group flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            >
              <Link
                to="/services"
                className="primary-btn group relative px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
              >
                <span className="relative z-10">Explore Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Rocket className="inline-block ml-1.5 w-3 h-3 transition-transform duration-300 group-hover:rotate-12" />
              </Link>

              <Link
                to="/demo"
                className="secondary-btn px-6 py-3 border border-cyan-400 text-cyan-400 font-medium rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </section>
  );
});

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
            <Link to="/demo" className="primary-btn">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
