'use client';

import { useEffect, useState } from 'react';

type User = {
  userName: string | null;
  userId: string | null;
  isAuth: boolean;
};

export const useAuth = () => {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem('authUser');

    return storedUser
      ? JSON.parse(storedUser)
      : {
          userName: null,
          userId: null,
          isAuth: false,
        };
  });

  useEffect(() => {
    localStorage.setItem('authUser', JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setUser({
      userName: null,
      userId: null,
      isAuth: false,
    });

    localStorage.removeItem('authUser');
  };

  return { user, setUser, logout };
};
