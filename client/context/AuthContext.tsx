'use client';

import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';

type AuthContextTypes = {
  userName: string | null;
  userId: string | null;
  isAuth: boolean;
  setUser: React.Dispatch<
    React.SetStateAction<{
      userName: string | null;
      userId: string | null;
      isAuth: boolean;
    }>
  >;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextTypes>({
  userName: null,
  userId: null,
  isAuth: false,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, logout } = useAuth();

  const value = {
    ...user,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
