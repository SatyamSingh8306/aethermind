import '../styles/Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <span className={`logo-text ${size}`}>AetherMind</span>
  );
};

export default Logo; 