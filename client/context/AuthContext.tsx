'use client';

import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';

type AuthContextTypes = {
  token: string | undefined;
  isAuth: boolean;
  setAuthData: React.Dispatch<
    React.SetStateAction<{
      token: string | undefined;
      isAuth: boolean;
    }>
  >;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextTypes>({
  token: undefined,
  isAuth: false,
  setAuthData: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { authData, setAuthData, logout } = useAuth();

  const value = {
    ...authData,
    setAuthData,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
