import { useLocalStorage } from 'usehooks-ts';

export const useAuth = () => {
  const [authData, setAuthData, removeValue] = useLocalStorage('authUser', {
    isAuth: false,
    token: undefined,
  });

  const logout = () => {
    setAuthData({
      isAuth: false,
      token: undefined,
    });
    removeValue();
  };

  return { authData, setAuthData, logout };
};
