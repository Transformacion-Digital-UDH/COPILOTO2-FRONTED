// src/hooks/useAuth.js
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const {
    user,
    loading,
    handleLogin,
    googleLogin,
    logout,
  } = useAuthStore();

  return {
    user,
    loading,
    handleLogin,
    googleLogin,
    logout,
  };
};
