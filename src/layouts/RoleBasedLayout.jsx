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
      bg-gray-50 dark:bg-gray-900 relative
      ${containerClass}
    `;
    return baseClasses.trim();
  };

  const getContentClasses = () => {
    const baseClasses = `
      layout-transition transition-all
      ${fullHeight ? 'min-h-[calc(100vh-80px)]' : 'min-h-full'}
      ${showSidebar && isOpen ? 'lg:ml-64' : 'lg:ml-0'}
      relative z-10
      ${contentClass}
    `;
    return baseClasses.trim();
  };

  const getHeaderClasses = () => {
    return `
      header-transition transition-all relative z-40
      ${showSidebar && isOpen ? 'lg:ml-64' : 'lg:ml-0'}
    `.trim();
  };

  return (
    <div className={getLayoutClasses()}>
      {/* Sidebar - Solo se renderiza si está habilitado */}
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
      
      {/* Header - Solo se renderiza si está habilitado */}
      {showHeader && (
        <div className={getHeaderClasses()}>
          <DashboardHeader />
        </div>
      )}
      
      {/* Main Content */}
      <main className={getContentClasses()}>
        <div className="p-6 h-full">
          {children}
        </div>
      </main>

      {/* Footer - Solo se renderiza si está habilitado */}
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
