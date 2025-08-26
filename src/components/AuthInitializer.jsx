import React, { useEffect } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';

/**
 * Componente que inicializa la autenticación al cargar la app
 * Se ejecuta una sola vez al inicio para verificar si hay una sesión válida
 */
const AuthInitializer = ({ children }) => {
  const { checkTokenValidity, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    // Solo verificar token si aparentemente hay una sesión activa
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user && !isAuthenticated) {
        // Verificar si el token sigue siendo válido
        await checkTokenValidity();
      }
    };

    initAuth();
  }, []);

  return children;
};

export default AuthInitializer;
