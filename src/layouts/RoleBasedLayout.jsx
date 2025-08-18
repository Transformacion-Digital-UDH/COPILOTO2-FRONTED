import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import AppFooter from '../components/AppFooter';
import { useSidebar } from '../hooks/useSidebar';
import { useAuthStore } from '../hooks/useAuthStore';

/**
 * Layout base reutilizable para todos los roles del sistema
 * Maneja automáticamente la configuración según el rol del usuario
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido principal de la página
 * @param {boolean} props.showHeader - Mostrar/ocultar header (default: true)
 * @param {boolean} props.showSidebar - Mostrar/ocultar sidebar (default: true)
 * @param {boolean} props.showFooter - Mostrar/ocultar footer (default: false)
 * @param {string} props.containerClass - Clases adicionales para el contenedor principal
 * @param {string} props.contentClass - Clases adicionales para el área de contenido
 * @param {boolean} props.fullHeight - Usar altura completa del viewport (default: true)
 * @param {Function} props.onNavigate - Función personalizada de navegación
 */
const RoleBasedLayout = ({
  children,
  showHeader = true,
  showSidebar = true,
  showFooter = false,
  containerClass = '',
  contentClass = '',
  fullHeight = true,
  onNavigate
}) => {
  const { isOpen, setIsOpen } = useSidebar();
  const { user, role } = useAuthStore();

  // Configuración de navegación por defecto
  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      // Navegación por defecto - usar router según implementación
      console.log('Navigate to:', path);
      // Aquí iría la lógica de navegación específica del router
    }
  };

  // Clases dinámicas basadas en la configuración
  const getLayoutClasses = () => {
    const baseClasses = `
      ${fullHeight ? 'min-h-screen' : 'min-h-full'}
      bg-gray-100 dark:bg-gray-900 relative
      ${containerClass}
    `;
    return baseClasses.trim();
  };

  const getContentClasses = () => {
    const baseClasses = `
      layout-transition transition-all
      ${fullHeight ? 'min-h-[calc(100vh-80px)]' : 'min-h-full'}
      ${showSidebar && isOpen ? 'lg:ml-64' : 'lg:ml-0'}
      relative z-10 pt-20 lg:pt-0
      ${contentClass}
    `;
    return baseClasses.trim();
  };

  const getHeaderClasses = () => {
    return `
      header-transition transition-all relative z-40
      ${showSidebar && isOpen ? 'lg:ml-64' : 'lg:ml-0'}
      fixed top-0 left-0 right-0 lg:relative lg:top-auto lg:left-auto lg:right-auto
    `.trim();
  };

  return (
    <div className={getLayoutClasses()}>
      {/* Backdrop simple con Tailwind puro - solo en móviles cuando sidebar abierto */}
      {showSidebar && isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Botón hamburguesa */}
      {showSidebar && (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            fixed z-[60] p-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none size-10
            ${isOpen 
              ? 'top-6 left-4 bg-slate-600/80 hover:bg-slate-500/80 text-white backdrop-blur-sm dark:bg-slate-700/90 dark:hover:bg-slate-600/90' 
              : 'top-6 left-4 bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:hover:bg-gray-700/90 dark:text-white dark:shadow-gray-900/50'
            }
            lg:${isOpen ? 'left-[15rem]' : 'left-8'}
            event-theme:${isOpen 
              ? 'bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500/80 hover:to-blue-500/80' 
              : 'bg-gradient-to-r from-gray-800/90 to-gray-900/90 hover:from-gray-700/90 hover:to-gray-800/90'
            }
          `}
        >
          {!isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      )}
      
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          role={role}
          fullName={user?.fullName || 'Usuario'}
          imageProfile={user?.imageProfile || null}
          currentPath={window.location.pathname}
          onNavigate={handleNavigate}
        />
      )}
      
      {/* Header - opaco en móviles cuando sidebar está abierto */}
      {showHeader && (
        <div className={`${getHeaderClasses()} z-20 transition-opacity duration-300 ${isOpen ? 'lg:opacity-100 opacity-30' : 'opacity-100'}`}>
          <DashboardHeader />
        </div>
      )}
      
      {/* Main Content */}
      <main className={getContentClasses()}>
        <div className="p-6 h-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className={`
          ${showSidebar && isOpen ? 'lg:ml-64' : 'lg:ml-0'}
          transition-all relative z-10
        `}>
          <AppFooter />
        </footer>
      )}
    </div>
  );
};

export default RoleBasedLayout;
