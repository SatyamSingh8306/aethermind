import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BackgroundAnimation from '../components/BackgroundAnimation';
import '../styles/LoginPage.css';
import userData from '../data/users.json';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const { login, isAuthenticated, error: authError, clearError } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // If user is already authenticated, redirect to appropriate dashboard
    if (isAuthenticated) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    }
  }, [isAuthenticated, navigate]);

  // Clear auth error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyCredentials = (email, password) => {
    return userData.users.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    ) || null;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    clearError();
    
    try {
      if (loginAttempts >= 3) {
        throw new Error('Too many login attempts. Please try again later.');
      }

      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Get user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Redirect based on role
          if (userData.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/dashboard');
          }
        }
      } else {
        setLoginAttempts(prev => prev + 1);
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: error.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <BackgroundAnimation />
      
      <div className="login-container">
        <div className="login-header">
          <h1>Sign In</h1>
          <p>Welcome back to AetherMind</p>
        </div>
        
        {(errors.form || authError) && (
          <div className="error-message">
            {errors.form || authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
              disabled={loading || loginAttempts >= 3}
            />
            {errors.email && <div className="input-error">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
              disabled={loading || loginAttempts >= 3}
            />
            {errors.password && <div className="input-error">{errors.password}</div>}
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={loading || loginAttempts >= 3}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {loginAttempts > 0 && (
            <div className="login-attempts">
              Remaining attempts: {3 - loginAttempts}
            </div>
          )}
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;