import { createContext, useState, useEffect } from 'react';
import { getMe } from '../api/userApi';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('automate_token');
      if (token) {
        try {
          const res = await getMe();
          setUser(res.data?.user || res.data);
        } catch {
          localStorage.removeItem('automate_token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res.success) {
      localStorage.setItem('automate_token', res.data.token);
      setUser(res.data.user);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await apiRegister(userData);
    if (res.success) {
      localStorage.setItem('automate_token', res.data.token);
      setUser(res.data.user);
    }
    return res;
  };

  const logout = async () => {
    try { await apiLogout(); } catch {}
    localStorage.removeItem('automate_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
