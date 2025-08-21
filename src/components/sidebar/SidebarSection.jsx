import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SidebarSectionComponent = ({
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
  // Estado para manejar submenús desplegables
  const [openSubmenus, setOpenSubmenus] = useState({});

  const isSubmenuActive = (submenu) => {
    return currentPath === submenu.path;
  };

  const handleSubmenuClick = (submenu) => {
    if (onNavigate) {
      onNavigate(submenu.path);
    }
    // Cerrar sidebar en móvil
    if (window.innerWidth < 1024) {
      // Esta lógica se manejará desde el componente padre
    }
  };

  const toggleSubmenu = (submenuName) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [submenuName]: !prev[submenuName]
    }));
  };

  // Función para renderizar subcategorías (para la estructura jerárquica del asesor)
  const renderSubcategory = (subcategory, scIndex) => {
    return (
      <li key={subcategory.name} className="mb-3">
        {/* Encabezado de subcategoría */}
        <div className="flex items-center px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          <span className="border-t border-gray-300 dark:border-gray-600 flex-1 mr-2"></span>
          {subcategory.label}
        </div>
        
        {/* Submenús de la subcategoría */}
        <ul className="pl-4 mt-1">
          {subcategory.submenus.map((submenu, smIndex) => (
            <li
              key={submenu.name}
              className="flex items-start mb-2 transition-all duration-500 text-left"
              style={{ 
                transitionDelay: isOpen ? `${(scIndex * 2 + smIndex) * 0.08}s` : '0s',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              <button
                onClick={() => handleSubmenuClick(submenu)}
                className={`
                  flex items-center justify-start w-full px-3 py-2 text-sm text-left
                  transition duration-200 rounded-md gap-1 cursor-pointer
                  ${isSubmenuActive(submenu)
                    ? 'bg-blue-600 text-white dark:bg-blue-700 font-medium' 
                    : 'text-[#27374D] dark:text-[#cdd6df] hover:bg-gray-100 dark:hover:text-[#f0f2f3] dark:hover:bg-gray-700'
                  }
                `}
              >
                <div className="flex items-center flex-1 justify-start text-left">
                  <span className="text-left">{submenu.label}</span>
                  
                  {/* Etiqueta "Jurado" */}
                  {role === 'asesor' && submenu.name.includes('jurado') && (
                    <span className="ml-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-800 px-2 py-1 rounded-md">
                      Jurado
                    </span>
                  )}
                </div>

                {/* Contador de pendientes */}
                {submenu.namecount && counts[submenu.namecount] > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold ml-auto">
                    {counts[submenu.namecount]}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  // Función para renderizar grupos de submenús desplegables
  const renderSubmenuGroup = (submenuGroup, sgIndex) => {
    const isSubmenuOpen = openSubmenus[submenuGroup.name];
    
    return (
      <li key={submenuGroup.name} className="mb-2">
        {/* Botón del grupo de submenús */}
        <button
          onClick={() => toggleSubmenu(submenuGroup.name)}
          className={`
            flex items-center justify-between w-full px-4 py-2 text-sm text-left
            transition duration-200 rounded-md cursor-pointer
            text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700
            font-medium
          `}
          style={{ 
            transitionDelay: isOpen ? `${sgIndex * 0.08}s` : '0s',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
          }}
        >
          <span className="text-left">{submenuGroup.label}</span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isSubmenuOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {/* Submenús del grupo */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isSubmenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <ul className="pl-6 mt-1">
            {submenuGroup.submenus.map((submenu, smIndex) => (
              <li
                key={submenu.name}
                className="flex items-start mb-1 transition-all duration-300"
                style={{ 
                  transitionDelay: isSubmenuOpen ? `${smIndex * 0.05}s` : '0s',
                  opacity: isSubmenuOpen ? 1 : 0,
                  transform: isSubmenuOpen ? 'translateY(0)' : 'translateY(-5px)'
                }}
              >
                <button
                  onClick={() => handleSubmenuClick(submenu)}
                  className={`
                    flex items-center justify-start w-full px-3 py-2 text-sm text-left
                    transition duration-200 rounded-md gap-1 cursor-pointer
                    ${isSubmenuActive(submenu)
                      ? 'bg-blue-600 text-white dark:bg-blue-700 font-medium' 
                      : 'text-[#27374D] dark:text-[#cdd6df] hover:bg-gray-100 dark:hover:text-[#f0f2f3] dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center flex-1 justify-start text-left">
                    <span className="text-left">{submenu.label}</span>
                    
                    {/* Etiqueta "Jurado" */}
                    {role === 'asesor' && submenu.name.includes('jurado') && (
                      <span className="ml-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-800 px-2 py-1 rounded-md">
                        Jurado
                      </span>
                    )}
                  </div>

                  {/* Contador de pendientes */}
                  {submenu.namecount && counts[submenu.namecount] > 0 && (
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold ml-auto">
                      {counts[submenu.namecount]}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
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
          ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}
          text-green-700 dark:text-green-400
        `}
      >
        <section.icon className="w-8 h-8 transition-transform transform group-hover:translate-x-2 duration-300 text-green-700 dark:text-green-400" />
        <span className="mx-4 text-left font-semibold text-gray-900 dark:text-white transition-transform transform group-hover:translate-x-2 duration-300">
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
        <ul className="pl-5 mt-2 mx-1 text-left">
          {section.submenus.map((submenu, smIndex) => {
            // Si el submenu tiene la propiedad isSubmenuGroup, renderizar como grupo desplegable
            if (submenu.isSubmenuGroup && submenu.submenus) {
              return renderSubmenuGroup(submenu, smIndex);
            }
            
            // Si el submenu tiene la propiedad isCategory, renderizar como subcategoría
            if (submenu.isCategory && submenu.submenus) {
              return renderSubcategory(submenu, smIndex);
            }
            
            // Renderizado normal para submenús regulares
            return (
              <li
                key={submenu.name}
                className="flex items-start mb-2 transition-all duration-500 text-left"
                style={{ 
                  transitionDelay: isOpen ? `${smIndex * 0.08}s` : '0s',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
                }}
              >
                <button
                  onClick={() => handleSubmenuClick(submenu)}
                  className={`
                    flex items-center justify-start w-full px-3 py-2 text-sm text-left
                    transition duration-200 rounded-md gap-1 cursor-pointer
                    ${isSubmenuActive(submenu)
                      ? 'bg-blue-600 text-white dark:bg-blue-700 font-medium' 
                      : 'text-[#27374D] dark:text-[#cdd6df] hover:bg-gray-100 dark:hover:text-[#f0f2f3] dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center flex-1 justify-start text-left">
                    <span className="text-left">{submenu.label}</span>
                    
                    {/* Etiqueta "Jurado" */}
                    {role === 'asesor' && submenu.name.includes('jurado') && (
                      <span className="ml-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-800 px-2 py-1 rounded-md">
                        Jurado
                      </span>
                    )}
                  </div>

                  {/* Contador de pendientes */}
                  {submenu.namecount && counts[submenu.namecount] > 0 && (
                    <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold ml-auto">
                      {counts[submenu.namecount]}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarSectionComponent;
