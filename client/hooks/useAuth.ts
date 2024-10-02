import { useLocalStorage } from 'usehooks-ts';

type AuthTypes = {
  isAuth: boolean;
  token: string | undefined;
};

export const useAuth = () => {
  const [authData, setAuthData, removeValue] = useLocalStorage<AuthTypes>(
    'authUser',
    {
      isAuth: false,
      token: undefined,
    },
  );

  const logout = () => {
    setAuthData({
      isAuth: false,
      token: undefined,
    });
    removeValue();
  };

  return { authData, setAuthData, logout };
};
