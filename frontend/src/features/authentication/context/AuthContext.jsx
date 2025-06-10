import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext();

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const { exp } = JSON.parse(decoded);
    return exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const validateAndSetAuth = useCallback((token, userData) => {
    if (token && userData && !isTokenExpired(token)) {
      setUser(JSON.parse(userData));
      setToken(token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!validateAndSetAuth(storedToken, storedUser)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, [validateAndSetAuth]);

  const login = useCallback((newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    validateAndSetAuth(newToken, JSON.stringify(userData));
  }, [validateAndSetAuth]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  }, []);

  const getAuthHeader = useCallback(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const updateUser = useCallback((userData) => {
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      token,
      login, 
      logout,
      getAuthHeader,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}