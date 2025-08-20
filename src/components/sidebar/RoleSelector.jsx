import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { useAuthStore } from '../../hooks/useAuthStore';

/**
 * Componente selector de roles para desarrollo
 * Permite cambiar entre diferentes roles para probar la funcionalidad
 */
const RoleSelector = () => {
  const { role, changeRole } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  // Lista de roles disponibles para testing
  const availableRoles = [
    { value: 'development', label: 'Desarrollo (Todos)' },
    { value: 'tesista', label: 'Tesista' },
    { value: 'asesor', label: 'Asesor' },
    { value: 'programa', label: 'Programa Académico' },
    { value: 'facultad', label: 'Facultad' },
    { value: 'vri', label: 'VRI' },
    { value: 'turnitin', label: 'Turnitin' },
    { value: 'admin', label: 'Administrador' }
  ];

  const currentRoleLabel = availableRoles.find(r => r.value === (role || 'development'))?.label || 'Desarrollo (Todos)';

  const handleRoleChange = (newRole) => {
    changeRole(newRole === 'development' ? null : newRole);
    setIsOpen(false);
  };

  return (
    <div className="mt-4 mb-2 mx-3">
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
          MODO DESARROLLO
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-200 truncate">
                {currentRoleLabel}
              </span>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {availableRoles.map((roleOption) => (
                <button
                  key={roleOption.value}
                  onClick={() => handleRoleChange(roleOption.value)}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    (role || 'development') === roleOption.value 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {roleOption.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
          Cambiar vista de roles
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
