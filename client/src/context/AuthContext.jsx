import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      } catch {
        localStorage.removeItem('admin_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('admin_token', newToken);
    setToken(newToken);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
