import React from 'react';

/**
 * Contenedor para cards de información o secciones
 * 
 * @param {Object} props
 * @param {string} props.title - Título del card
 * @param {string} props.subtitle - Subtítulo opcional
 * @param {React.ReactNode} props.children - Contenido del card
 * @param {React.ReactNode} props.actions - Botones de acción
 * @param {string} props.variant - Variante visual ('default', 'info', 'success', 'warning', 'error')
 * @param {boolean} props.compact - Versión compacta con menos padding
 * @param {string} props.className - Clases CSS adicionales
 */
const CardContainer = ({ 
  title, 
  subtitle,
  children, 
  actions, 
  variant = 'default',
  compact = false,
  className = '' 
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
  };

  const padding = compact ? 'p-4' : 'p-6';

  return (
    <div className={`
      rounded-lg border shadow-sm overflow-hidden
      ${variantClasses[variant]}
      ${className}
    `}>
      {/* Header */}
      {(title || actions) && (
        <div className={`${padding} ${children ? 'pb-3' : ''} ${subtitle ? 'pb-2' : ''}`}>
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className={`
                  font-semibold text-gray-900 dark:text-white
                  ${compact ? 'text-base' : 'text-lg'}
                `}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="ml-4 flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      {children && (
        <div className={!title && !actions ? padding : 'px-6 pb-6'}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CardContainer;
