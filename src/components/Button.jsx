import React from 'react';

/**
 * Componente de botón reutilizable con diferentes variantes y estados
 * 
 * @param {Object} props
 * @param {string} props.children - Texto o contenido del botón
 * @param {string} props.variant - Variante del botón ('primary', 'secondary', 'success', 'danger', 'warning', 'info')
 * @param {string} props.size - Tamaño del botón ('sm', 'md', 'lg')
 * @param {boolean} props.loading - Estado de carga
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {string} props.type - Tipo de botón ('button', 'submit', 'reset')
 * @param {Function} props.onClick - Función que se ejecuta al hacer click
 * @param {string} props.className - Clases CSS adicionales
 * @param {Object} props.icon - Icono opcional (componente o elemento)
 * @param {string} props.iconPosition - Posición del icono ('left', 'right')
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  icon = null,
  iconPosition = 'left',
  ...props
}) => {
  // Estilos base
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variantes de color
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
    info: 'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500',
    outline: 'border-2 border-gray-300 hover:border-gray-400 bg-transparent text-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-300 focus:ring-gray-500'
  };

  // Tamaños
  const sizes = {
    sm: 'px-3 py-1.5 text-sm space-x-1',
    md: 'px-4 py-2 text-sm space-x-2',
    lg: 'px-6 py-3 text-base space-x-2'
  };

  // Combinar clases
  const buttonClasses = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const isDisabled = disabled || loading;

  const renderIcon = () => {
    if (loading) {
      return (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      );
    }
    return icon;
  };

  const renderContent = () => {
    if (loading && !children) {
      return 'Cargando...';
    }

    const iconElement = renderIcon();
    const textElement = loading ? 'Procesando...' : children;

    if (!iconElement) {
      return textElement;
    }

    return iconPosition === 'right' ? (
      <>
        {textElement}
        {iconElement}
      </>
    ) : (
      <>
        {iconElement}
        {textElement}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
