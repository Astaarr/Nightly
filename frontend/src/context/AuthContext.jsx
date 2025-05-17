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
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar carga inicial

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData && !isTokenExpired(token)) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    } else {
      // Elimina los datos inválidos pero NO redirige aquí
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsLoading(false); // Finaliza la carga
  }, []);

  const login = useCallback((token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login'; // Redirige SOLO cuando se llama explícitamente
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}