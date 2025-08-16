import React from 'react';

/**
 * Contenedor principal para páginas completas
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la página
 * @param {string} props.subtitle - Subtítulo o descripción
 * @param {React.ReactNode} props.children - Contenido de la página
 * @param {React.ReactNode} props.actions - Acciones de la página (botones)
 * @param {boolean} props.loading - Estado de carga
 * @param {string} props.className - Clases CSS adicionales
 */
const PageContainer = ({ 
  title, 
  subtitle, 
  children, 
  actions, 
  loading = false,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Page Header */}
      {(title || actions) && (
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="ml-4 flex items-center space-x-3">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Page Content */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
