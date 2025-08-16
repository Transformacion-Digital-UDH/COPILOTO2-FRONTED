import React from 'react';

/**
 * Contenedor para tablas de datos con funcionalidad de búsqueda y filtros
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la tabla
 * @param {React.ReactNode} props.children - Contenido de la tabla
 * @param {React.ReactNode} props.filters - Componentes de filtro
 * @param {React.ReactNode} props.actions - Botones de acción adicionales
 * @param {string} props.className - Clases CSS adicionales
 */
const DataTableContainer = ({ 
  title, 
  children, 
  filters, 
  actions, 
  className = '' 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Header con título y acciones */}
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {actions && (
              <div className="flex items-center space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filtros */}
      {filters && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-4">
            {filters}
          </div>
        </div>
      )}

      {/* Contenido de la tabla */}
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default DataTableContainer;
