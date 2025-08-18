import React from 'react';

/**
 * Componente de botón específico para solicitar revisiones
 * 
 * @param {Object} props
 * @param {boolean} props.loading - Estado de carga
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {Function} props.onClick - Función que se ejecuta al hacer click
 * @param {string} props.variant - Variante del botón ('primary', 'secondary')
 * @param {string} props.className - Clases CSS adicionales
 */
const ButtonRevision = ({
  loading = false,
  disabled = false,
  onClick,
  variant = 'primary',
  className = ''
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const isDisabled = disabled || loading;

  // Variantes de color
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white'
  };

  const buttonClasses = `
    ${variants[variant] || variants.primary}
    px-4 py-2 rounded text-sm font-medium transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={buttonClasses}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current inline-block mr-2"></div>
          Enviando...
        </>
      ) : (
        'Solicitar revisión'
      )}
    </button>
  );
};

export default ButtonRevision;
