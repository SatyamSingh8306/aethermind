import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faLinkedin, 
  faGithub, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            Aether<span>Mind</span>
          </div>
          <p className="footer-description">
            Empowering businesses with intelligent AI solutions for automation and innovation.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.linkedin.com/company/aether-mind/" className="social-icon" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/SatyamSingh8306/aethermind" className="social-icon" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        <div className="footer-links-column">
          <h3>Services</h3>
          <div className="footer-links">
            <Link to="/services#automation">AI Automation</Link>
            <Link to="/services#chatbot">AI Chatbots</Link>
            <Link to="/services#analytics">Data Analytics</Link>
            <Link to="/services#custom">Custom Solutions</Link>
          </div>
        </div>

        <div className="footer-links-column">
          <h3>Company</h3>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/about#team">Our Team</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-links-column">
          <h3>Resources</h3>
          <div className="footer-links">
            <Link to="/blog">Blog</Link>
            <Link to="/documentation">Documentation</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} AetherMind. All rights reserved.</p>
        <div>
          <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;