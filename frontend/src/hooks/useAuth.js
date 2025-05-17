import { useCallback } from "react";

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload); // decodifica base64
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}

function isTokenExpired(token) {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;

  const now = Date.now() / 1000; // actual en segundos
  return decoded.exp < now;
}

export function useAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const tokenIsValid = token && !isTokenExpired(token);
  const isAuthenticated = !!tokenIsValid;

  const userData = tokenIsValid && user ? JSON.parse(user) : null;

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }, []);

  // Si ya ha expirado el token, lo borramos automáticamente
  if (!tokenIsValid && token) {
    logout();
  }

  return {
    token,
    user: userData,
    isAuthenticated,
    logout,
  };
}

