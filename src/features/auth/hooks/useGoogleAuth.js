import { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { googleLogin: authGoogleLogin } = useAuthStore(); // O useContext

  const googleLogin = async (response) => {
    try {
      setIsLoading(true);
      await authGoogleLogin(response);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    googleLogin
  };
};