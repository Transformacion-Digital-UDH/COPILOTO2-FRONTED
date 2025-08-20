import React, { useEffect } from 'react';
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
          {/* Mostrar línea de tiempo para tesista */}
          {(role === 'tesista' || role === 'development') && (
            <TesistaTimeline
              currentPath={currentPath}
              onNavigate={handleNavigate}
            />
          )}
          
          {/* Mostrar secciones normales solo para roles específicos (no tesista ni development) */}
          {role !== 'tesista' && role !== 'development' && sections.map((section, index) => (
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
          
          {/* En modo desarrollo, mostrar las secciones de otros roles (excluyendo tesista) */}
          {role === 'development' && sections.filter(section => 
            section.name !== 'ProyectoDeTesis' && 
            section.name !== 'Ejecucion' && 
            section.name !== 'InformeFinal' && 
            section.name !== 'Sustentacion' && 
            section.name !== 'Herramientas'
          ).map((section, index) => (
            <div key={`dev-${section.name}`} className="mt-8">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-t border-gray-200 dark:border-gray-600 pt-4">
                {section.name.toUpperCase()} (DEMO)
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
        </nav>

        {/* Selector de roles para desarrollo - al final del sidebar */}
        <div className="mt-auto">
          <RoleSelector />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
