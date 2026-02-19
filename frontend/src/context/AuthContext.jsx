import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const DASHBOARD_URL = 'https://stockyard-dashboard.onrender.com';

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.user);
      if (response.user && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
        window.location.href = DASHBOARD_URL;
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      setUser(response.user);
      window.location.href = DASHBOARD_URL;
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.errors?.[0]?.msg || 
                      'Registration failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

 const login = async (credentials) => {
  try {
    setError(null);

    // Step 1: Login (sets cookie)
    await authService.login(credentials);

    // Step 2: Confirm cookie works
    const response = await authService.getMe();
    setUser(response.user);

    // Step 3: Redirect only after confirmation
    window.location.href = 'https://stockyard-dashboard.onrender.com';

  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Login failed';
    setError(errorMsg);
    throw new Error(errorMsg);
  }
};

const logout = async () => {
  try {
    await authService.logout();
    setUser(null);
    window.location.href = "https://stockyard-frontend-uuyr.onrender.com/";
  } catch (err) {
    console.error('Logout error:', err);
  }
};


  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
