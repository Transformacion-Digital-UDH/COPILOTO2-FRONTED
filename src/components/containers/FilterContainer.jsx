import React from 'react';

/**
 * Contenedor para formularios de filtrado y búsqueda
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inputs de filtro
 * @param {Function} props.onReset - Función para resetear filtros
 * @param {string} props.className - Clases CSS adicionales
 */
const FilterContainer = ({ children, onReset, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {children}
      {onReset && (
        <button
          onClick={onReset}
          className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default FilterContainer;
