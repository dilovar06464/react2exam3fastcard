import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken } from '../utils/token';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();
    if (token && token !== "undefined" && token !== "null") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    if (token && token !== "undefined" && token !== "null") {
      saveToken(token);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("store_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
