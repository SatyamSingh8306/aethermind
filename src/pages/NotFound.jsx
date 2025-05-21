import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for seems to have vanished into the digital void.
        </p>
        <div className="error-actions">
          <Link to="/" className="home-button">
            Return Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="back-button"
          >
            Go Back
          </button>
        </div>
        <div className="error-help">
          <p>Need help? Try these options:</p>
          <ul className="help-links">
            <li>
              <Link to="/contact">Contact Support</Link>
            </li>
            <li>
              <Link to="/products">Browse Products</Link>
            </li>
            <li>
              <Link to="/services">Explore Services</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="error-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
};

export default NotFound; 