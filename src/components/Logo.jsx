import { Link } from 'react-router-dom';
import '../styles/Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <Link to="/" className="logo-container">
      <span className={`logo-text ${size}`}>AetherMind</span>
    </Link>
  );
};

export default Logo; 