import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setError('Failed to restore session');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const authResponse = await loginUser(email, password);
      const normalizedUser = authResponse?.user ? {
        id: authResponse.user._id || authResponse.user.id,
        name: authResponse.user.fullName || authResponse.user.name || '',
        email: authResponse.user.email,
        role: authResponse.user.role || 'client'
      } : {
        id: authResponse?._id || authResponse?.id,
        name: authResponse?.fullName || authResponse?.name || '',
        email: authResponse?.email,
        role: authResponse?.role || 'client'
      };

      setUser(normalizedUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const newUserResp = await registerUser(userData);
      const normalizedUser = newUserResp?.user ? {
        id: newUserResp.user._id || newUserResp.user.id,
        name: newUserResp.user.fullName || newUserResp.user.name || '',
        email: newUserResp.user.email,
        role: newUserResp.user.role || 'client'
      } : {
        id: newUserResp?._id || newUserResp?.id,
        name: newUserResp?.fullName || newUserResp?.name || '',
        email: newUserResp?.email,
        role: newUserResp?.role || 'client'
      };

      setUser(normalizedUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to logout properly');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        register,
        logout, 
        loading, 
        error,
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;