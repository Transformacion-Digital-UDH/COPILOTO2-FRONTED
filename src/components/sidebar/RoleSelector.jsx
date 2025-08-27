import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../hooks/useAuthStore';

/**
 * Componente toggle para alternar entre vista normal y vista de desarrollo
 */
const RoleSelector = ({ onToggleDevelopmentMode }) => {
  const { role } = useAuthStore();
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);

  const handleToggle = () => {
    const newMode = !isDevelopmentMode;
    setIsDevelopmentMode(newMode);
    if (onToggleDevelopmentMode) {
      onToggleDevelopmentMode(newMode);
    }
  };

  return (
    <div className="mt-4 mb-2 mx-3">
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
          VISTA DE DESARROLLO
        </div>
        
        <button
          onClick={handleToggle}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
            isDevelopmentMode
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <div className="flex items-center">
            {isDevelopmentMode ? (
              <Eye className="w-4 h-4 mr-2" />
            ) : (
              <EyeOff className="w-4 h-4 mr-2" />
            )}
            <span className="font-medium">
              {isDevelopmentMode ? 'Vista Completa' : 'Vista Normal'}
            </span>
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${
            isDevelopmentMode 
              ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
              : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
          }`}>
            {isDevelopmentMode ? 'ON' : 'OFF'}
          </div>
        </button>

        <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
          {isDevelopmentMode 
            ? 'Mostrando todos los roles' 
            : role ? `Mostrando solo: ${role}` : 'Vista por rol'
          }
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
