import { createContext, useState, useEffect } from 'react';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    // This is a mock implementation. In a real app, you would
    // make an API call to your authentication server
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation - you would replace this with a real API call
        if (email === 'user@example.com' && password === 'password') {
          const user = {
            id: 1,
            name: 'Test User',
            email: email,
            role: 'user'
          };
          
          // Store user in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate API delay
    });
  };

  // Register function
  const register = async (name, email, password) => {
    // Mock implementation - in a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists (mock)
        if (email === 'user@example.com') {
          reject(new Error('User already exists with this email'));
          return;
        }
        
        // Create a new user (mock)
        const user = {
          id: Math.floor(Math.random() * 1000),
          name,
          email,
          role: 'user'
        };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Value to be provided to consumers of this context
  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;