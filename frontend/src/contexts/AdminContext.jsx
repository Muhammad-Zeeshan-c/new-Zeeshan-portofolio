import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [adminData, setAdminData] = useState(null);

  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  // Check for existing session on load
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem('adminSession');
      if (sessionData) {
        try {
          const { timestamp, authenticated, adminId, token } = JSON.parse(sessionData);
          const now = new Date().getTime();

          // Check if session is still valid (30 minutes)
          if (authenticated && token && (now - timestamp) < SESSION_DURATION) {
            setIsAuthenticated(true);
            setAdminData({ id: adminId });
          } else {
            // Session expired, remove it
            localStorage.removeItem('adminSession');
            setIsAuthenticated(false);
            setAdminData(null);
          }
        } catch (error) {
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
          setAdminData(null);
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [SESSION_DURATION]);

  // Auto logout after session expires
  useEffect(() => {
    if (isAuthenticated) {
      const sessionTimer = setInterval(() => {
        const sessionData = localStorage.getItem('adminSession');
        if (sessionData) {
          const { timestamp } = JSON.parse(sessionData);
          const now = new Date().getTime();

          if ((now - timestamp) >= SESSION_DURATION) {
            logout();
          }
        }
      }, 60000); // Check every minute

      return () => clearInterval(sessionTimer);
    }
  }, [isAuthenticated, SESSION_DURATION]);

  // Login function – calls Express backend /api/auth/login
  const login = async (username, password) => {
    // Check if account is locked
    if (lockoutTime && new Date().getTime() < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime - new Date().getTime()) / 1000 / 60);
      throw new Error(`Account locked. Please try again in ${remainingTime} minutes.`);
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Successfully authenticated via backend
        const sessionData = {
          authenticated: true,
          timestamp: new Date().getTime(),
          adminId: data.admin?.username || 'admin',
          username: data.admin?.username || 'admin',
          fullName: data.admin?.name || 'Muhammad Zeeshan',
          token: data.token // JWT token from backend
        };

        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        setIsAuthenticated(true);
        setAdminData({
          id: data.admin?.username || 'admin',
          username: data.admin?.username || 'admin',
          fullName: data.admin?.name || 'Muhammad Zeeshan'
        });
        setLoginAttempts(0);
        setLockoutTime(null);

        console.log('✅ Admin logged in successfully via backend');
        return true;
      } else {
        // Failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        // Lock account after 3 failed attempts for 15 minutes
        if (newAttempts >= 3) {
          const lockTime = new Date().getTime() + (15 * 60 * 1000);
          setLockoutTime(lockTime);
          throw new Error('Too many failed login attempts. Account locked for 15 minutes.');
        }

        throw new Error(data.message || `Invalid credentials. Remaining attempts: ${3 - newAttempts}`);
      }
    } catch (err) {
      // If error already thrown from our logic (like Account locked or backend 401), re-throw
      if (err.message && err.message !== 'Connection error. Make sure the backend server is running.') {
        throw err;
      }

      console.error('Login error:', err);
      throw new Error('Connection error. Make sure the backend server is running.');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setAdminData(null);
    setLoginAttempts(0);
    setLockoutTime(null);
    console.log('🚪 Admin logged out');
  };

  // Extend session
  const extendSession = () => {
    if (isAuthenticated && adminData) {
      const existing = localStorage.getItem('adminSession');
      if (existing) {
        const parsed = JSON.parse(existing);
        parsed.timestamp = new Date().getTime();
        localStorage.setItem('adminSession', JSON.stringify(parsed));
      }
    }
  };

  // Get remaining session time
  const getSessionTimeRemaining = () => {
    const sessionData = localStorage.getItem('adminSession');
    if (sessionData && isAuthenticated) {
      const { timestamp } = JSON.parse(sessionData);
      const elapsed = new Date().getTime() - timestamp;
      const remaining = SESSION_DURATION - elapsed;
      return Math.max(0, remaining);
    }
    return 0;
  };

  const value = {
    isAuthenticated,
    isLoading,
    adminData,
    login,
    logout,
    extendSession,
    getSessionTimeRemaining,
    loginAttempts,
    lockoutTime
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
