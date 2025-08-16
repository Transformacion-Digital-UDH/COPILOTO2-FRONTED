import React from 'react';

/**
 * Contenedor para grupos de botones de acción
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Botones de acción
 * @param {string} props.align - Alineación ('left', 'center', 'right', 'space-between')
 * @param {string} props.size - Tamaño del grupo ('sm', 'md', 'lg')
 * @param {boolean} props.vertical - Disposición vertical en lugar de horizontal
 * @param {string} props.className - Clases CSS adicionales
 */
const ActionContainer = ({ 
  children, 
  align = 'right',
  size = 'md',
  vertical = false,
  className = '' 
}) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    'space-between': 'justify-between'
  };

  const sizeClasses = {
    sm: vertical ? 'space-y-2' : 'space-x-2',
    md: vertical ? 'space-y-3' : 'space-x-3',
    lg: vertical ? 'space-y-4' : 'space-x-4'
  };

  const directionClass = vertical ? 'flex-col items-stretch' : 'flex-row items-center';

  return (
    <div className={`
      flex ${directionClass} ${alignClasses[align]} ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ActionContainer;
