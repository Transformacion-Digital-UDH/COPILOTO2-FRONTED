import React from 'react';
import { useSidebar } from '../hooks/useSidebar';
import { useAuthStore } from '../hooks/useAuthStore';
import { useThemeStore } from '../hooks/useThemeStore';
import ThemeToggle from './ThemeToggle';
import ButtonUser from './ButtonUser';
import ButtonChatBot from './ButtonChatBot';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import IconMenu from './icons/IconMenu';
import SnowFlake from './SnowFlake';
import ButtonGuide from './ButtonGuide';
import ButtonYoutube from './ButtonYoutube';

const DashboardHeader = () => {
  const { isOpen, toggleSidebar } = useSidebar();
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
        <div className={`flex items-center flex-col ${isOpen ? 'z-50' : 'z-0'}`}>
          {/* botón hamburguesa cerrar y abrir menú de navegación */}
          <button 
            onClick={toggleSidebar}
            className={`
              ${isOpen
                ? 'lg:left-[15rem] translate-x-0 xs:translate-x-[194px] lg:translate-x-0 z-50 dark:bg-slate-600 bg-slate-300 p-1 rounded-[50%]'
                : 'lg:left-8 translate-x-0 z-0'
              } 
              button-transition transition-all dark:text-white focus:outline-none fixed top-6 left-4
            `}
          >
            {!isOpen ? (
              <IconMenu className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        <div className="flex items-center lg:gap-2 gap-1">
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
