import React from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import { useThemeStore } from '../hooks/useThemeStore';
import ThemeToggle from './ThemeToggle';
import ButtonUser from './ButtonUser';
import ButtonChatBot from './ButtonChatBot';
import SnowFlake from './SnowFlake';
import ButtonGuide from './ButtonGuide';
import ButtonYoutube from './ButtonYoutube';

const DashboardHeader = () => {
  const { role } = useAuthStore();
  const { isEvent } = useThemeStore();

  const shouldShowGuideButton = () => {
    const allowedRoles = ['estudiante', 'programa', 'facultad', 'asesor', 'turnitin'];
    return allowedRoles.includes(role);
  };

  const shouldShowYoutubeButton = () => {
    return role === 'asesor';
  };

  const shouldShowChatBotButton = () => {
    const allowedRoles = ['estudiante', 'admin'];
    return allowedRoles.includes(role);
  };

  return (
    <>
      {isEvent && <SnowFlake />}

      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 dark:text-white">
        {/* Espacio reservado para el botón hamburguesa (ahora está en el layout) */}
        <div className="w-6 h-6"></div>

        <div className="flex items-center lg:gap-2 gap-1 ml-auto">
          {/* botón de guía según el rol */}
          {shouldShowGuideButton() && <ButtonGuide />}

          {/* botón de YouTube según el rol */}
          {shouldShowYoutubeButton() && <ButtonYoutube />}

          {/* botón para redirigir al chatbot */}
          {shouldShowChatBotButton() && <ButtonChatBot />}
          
          {/* botón para cambiar tema - puedes cambiar variant a 'complete' o 'cycle' */}
          <ThemeToggle variant="toggle" />

          {/* botón del usuario, perfil y cerrar sesión */}
          <ButtonUser />
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
