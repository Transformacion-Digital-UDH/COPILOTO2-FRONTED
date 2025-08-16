import React, { useEffect } from 'react';
import { useSidebarConfig } from '../hooks/useSidebarConfig';
import UserProfile from './sidebar/UserProfile';
import SidebarSection from './sidebar/SidebarSection';

const Sidebar = ({
  isOpen,
  setIsOpen,
  isDark = false,
  role,
  fullName,
  isJury,
  imageProfile,
  counts = {},
  currentPath = '/',
  onNavigate
}) => {
  const {
    sections,
    toggleSection,
    isSectionOpen,
    isSubmenuActive,
    isSectionActive,
    openActiveSections
  } = useSidebarConfig(role);

  // Abrir sección activa cuando cambie la ruta
  useEffect(() => {
    openActiveSections(currentPath);
  }, [currentPath, openActiveSections]);

  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    // Cerrar sidebar en móvil
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop solo para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto
        ${isOpen ? 'translate-x-0 sidebar-expand' : '-translate-x-full lg:w-0 sidebar-collapse'}
        transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      `}>
        
        {/* Perfil del usuario - con padding mínimo para el header */}
        <div className="pt-6">
          <UserProfile
            fullName={fullName}
            role={role}
            imageProfile={imageProfile}
            isOpen={isOpen}
          />
        </div>

        {/* Navegación */}
        <nav className={`
          mt-5 mb-10 mx-1 transition-opacity
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ transitionDuration: 'var(--sidebar-content-duration)' }}>
          {sections.map((section, index) => (
            <SidebarSection
              key={section.name}
              section={section}
              isOpen={isSectionOpen(section.name)}
              isActive={isSectionActive(section, currentPath)}
              onToggle={() => toggleSection(section.name)}
              onNavigate={handleNavigate}
              counts={counts}
              currentPath={currentPath}
              role={role}
              sidebarOpen={isOpen}
              index={index}
            />
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
