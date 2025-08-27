import { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { googleLogin: authGoogleLogin } = useAuthStore(); // O useContext

  const googleLogin = async (response, onSuccess) => {
    try {
      setIsLoading(true);
      await authGoogleLogin(response);
      // Llamar callback de éxito si se proporciona
      if (onSuccess) {
        onSuccess();
      }
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