import React, { useEffect, useState } from 'react';
import { useSidebarConfig } from '../hooks/useSidebarConfig';
import UserProfile from './sidebar/UserProfile';
import SidebarSection from './sidebar/SidebarSection';
import TesistaTimeline from '../features/tesista/components/TesistaTimeline';
import RoleSelector from './sidebar/RoleSelector';

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
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);
  
  const {
    sections,
    toggleSection,
    isSectionOpen,
    isSubmenuActive,
    isSectionActive,
    openActiveSections
  } = useSidebarConfig(isDevelopmentMode ? 'development' : role);

  // Abrir sección activa cuando cambie la ruta
  useEffect(() => {
    openActiveSections(currentPath);
  }, [currentPath, openActiveSections]);

  const handleToggleDevelopmentMode = (newMode) => {
    setIsDevelopmentMode(newMode);
  };

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
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 w-64 overflow-y-auto z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:w-0'}
        transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      `}>
        
        {/* Perfil del usuario - padding ajustado para superposición en móviles */}
        <div className="pt-6 lg:pt-6">
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
          {/* Mostrar línea de tiempo para estudiantes (tesistas) cuando no está en modo desarrollo */}
          {!isDevelopmentMode && (role === 'estudiante' || role === 'tesista') && (
            <TesistaTimeline
              currentPath={currentPath}
              onNavigate={handleNavigate}
            />
          )}
          
          {/* Mostrar secciones normales para roles específicos (cuando no está en modo desarrollo) */}
          {!isDevelopmentMode && role !== 'estudiante' && role !== 'tesista' && sections.map((section, index) => (
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
          
          {/* En modo desarrollo, mostrar todas las secciones organizadas por rol */}
          {isDevelopmentMode && (
            <>
              {/* Timeline de tesista siempre visible en modo desarrollo */}
              <div className="mb-8">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600 mb-4">
                  ESTUDIANTE / TESISTA
                </div>
                <TesistaTimeline
                  currentPath={currentPath}
                  onNavigate={handleNavigate}
                />
              </div>
              
              {/* Otras secciones por rol */}
              {sections.filter(section => 
                section.originalRole !== 'estudiante' && section.originalRole !== 'tesista'
              ).map((section, index) => (
                <div key={`dev-${section.name}`} className="mt-8">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-t border-gray-200 dark:border-gray-600 pt-4">
                    {section.originalRole.toUpperCase()}
                  </div>
                  <SidebarSection
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
                </div>
              ))}
            </>
          )}
        </nav>

        {/* Selector de roles para desarrollo - al final del sidebar */}
        <div className="mt-auto">
          <RoleSelector onToggleDevelopmentMode={handleToggleDevelopmentMode} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
