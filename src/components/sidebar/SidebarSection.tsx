import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SidebarSection, SidebarSubmenu } from '../../config/sidebar-config';

interface SidebarSectionProps {
  section: SidebarSection;
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  onNavigate?: (path: string) => void;
  counts?: Record<string, number>;
  currentPath: string;
  role: string;
  sidebarOpen: boolean;
  index: number;
}

const SidebarSectionComponent: React.FC<SidebarSectionProps> = ({
  section,
  isOpen,
  isActive,
  onToggle,
  onNavigate,
  counts = {},
  currentPath,
  role,
  sidebarOpen,
  index
}) => {
  const isSubmenuActive = (submenu: SidebarSubmenu) => {
    return currentPath === submenu.path;
  };

  const handleSubmenuClick = (submenu: SidebarSubmenu) => {
    if (onNavigate) {
      onNavigate(submenu.path);
    }
    // Cerrar sidebar en móvil
    if (window.innerWidth < 1024) {
      // Esta lógica se manejará desde el componente padre
    }
  };

  return (
    <div 
      className="mb-4 transition-all ease-out"
      style={{
        transitionDuration: `${index * 0.8}s`,
        transitionDelay: `${index * 0.3}s`,
        opacity: sidebarOpen ? 1 : 0,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-40px)'
      }}
    >
      {/* Botón de sección */}
      <button 
        onClick={onToggle}
        className={`
          flex w-full items-center px-[9px] py-2 mt-4 cursor-pointer 
          rounded-md group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-white' : 'text-green-700'}
        `}
      >
        <section.icon className="w-8 h-8 transition-transform transform group-hover:translate-x-2 duration-300" />
        <span className="mx-4 text-left font-semibold text-black dark:text-white transition-transform transform group-hover:translate-x-2 duration-300">
          {section.label}
        </span>
        <ChevronDown 
          className={`w-6 h-4 ml-auto text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Submenús */}
      <div className={`
        overflow-hidden transition-all duration-700 ease-out origin-top
        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <ul className="pl-5 mt-2 mx-1">
          {section.submenus.map((submenu, smIndex) => (
            <li
              key={submenu.name}
              className="flex items-center mb-2 transition-all duration-500"
              style={{ 
                transitionDelay: isOpen ? `${smIndex * 0.08}s` : '0s',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              <button
                onClick={() => handleSubmenuClick(submenu)}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-sm 
                  transition duration-200 rounded-md gap-1 cursor-pointer
                  ${isSubmenuActive(submenu)
                    ? 'bg-blue-600 text-white dark:bg-blue-700 font-medium' 
                    : 'text-[#27374D] dark:text-[#cdd6df] hover:bg-gray-100 dark:hover:text-[#f0f2f3] dark:hover:bg-gray-700'
                  }
                `}
              >
                <div className="flex items-center">
                  <span>{submenu.label}</span>
                  
                  {/* Etiqueta "Jurado" */}
                  {role === 'asesor' && submenu.name.includes('jurado') && (
                    <span className="ml-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-md">
                      Jurado
                    </span>
                  )}
                </div>

                {/* Contador de pendientes */}
                {submenu.namecount && counts[submenu.namecount] > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                    {counts[submenu.namecount]}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarSectionComponent;
