import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import AuthImageSection from '../components/AuthImagenSection';
import AuthFormContainer from '../components/AuthFormContainer';
import ThemeToggle from '../../../components/ThemeToggle';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Efecto para redirigir automáticamente si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen sm:flex-row flex flex-col sm:gap-0 gap-10 bg-white dark:bg-slate-900 relative">
      <AuthImageSection />
      <AuthFormContainer />
      
      {/* Theme Toggle - Botón flotante en esquina inferior derecha */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle variant="toggle" />
      </div>
      
      {/* TODO: Agregar cuando estén disponibles:
        <ButtonFloatPwa />
        <InstallPwaAppModal />
      */}
    </div>
  );
};

export default LoginPage;