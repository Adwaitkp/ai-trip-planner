import { createContext, useContext, useState } from 'react';
import { authApi } from '../api/travelApi';

const AuthContext = createContext(null);

const readStoredUser = () => {
  const storedUser = localStorage.getItem('user');

  if (!storedUser || storedUser === 'undefined' || storedUser === 'null') {
    localStorage.removeItem('user');
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res;
  };

  const register = async (data) => {
    const res = await authApi.register(data);
    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);