import React, { useEffect } from 'react';
import { useSidebarConfig } from '../hooks/useSidebarConfig';
import UserProfile from './sidebar/UserProfile';
import SidebarSection from './sidebar/SidebarSection';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDark?: boolean;
  role: string;
  fullName: string;
  isJury?: boolean;
  imageProfile?: string;
  counts?: Record<string, number>;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  isDark = false,
  role,
  fullName,
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

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
    // Cerrar sidebar en móvil
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex bg-white dark:bg-gray-800">
      {/* Backdrop solo para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 transition-all duration-500 overflow-y-auto
        ${isOpen ? 'translate-x-0 lg:overflow-y-auto' : '-translate-x-full overflow-y-hidden'}
        lg:relative ${isOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full lg:w-0 lg:overflow-y-hidden'}
        ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
      `}>
        
        {/* Perfil del usuario */}
        <UserProfile
          fullName={fullName}
          role={role}
          imageProfile={imageProfile}
          isOpen={isOpen}
        />

        {/* Navegación */}
        <nav className={`
          mt-5 mb-10 mx-1 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}>
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
    </div>
  );
};

export default Sidebar;