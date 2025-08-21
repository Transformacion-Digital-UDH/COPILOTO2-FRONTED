import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

const ButtonUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { user, role, logout } = useAuthStore();
  const navigate = useNavigate();

  // Detectar si la app puede instalarse como PWA
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setCanInstall(false);
        setDeferredPrompt(null);
      }
    }
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/perfil');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-16 z-50 w-32 sm:w-36 bg-white rounded-md shadow-xl font-medium dark:bg-gray-800 dark:border-gray-200/20 dark:border-[1px] p-1">
          
          {/* Perfil - Solo si no es rol 'vri' o 'turnitin' */}
          {role !== 'vri' && role !== 'turnitin' && (
            <button
              onClick={handleProfileClick}
              className="block w-full text-left px-3 py-1 sm:py-2 text-sm text-black dark:text-white hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white rounded-md"
            >
              Perfil
            </button>
          )}
          
          {/* Instalar app - Solo si está disponible */}
          {canInstall && (
            <button
              onClick={installApp}
              className="block w-full text-left px-3 py-1 sm:py-2 text-sm text-black dark:text-white hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white rounded-md"
            >
              Instalar app
            </button>
          )}
          
          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="inline-flex w-full text-start px-3 py-1 sm:py-2 text-sm text-black dark:text-white hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonUser;
