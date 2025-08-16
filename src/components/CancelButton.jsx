import React from 'react';
import Button from './Button.jsx';

/**
 * Botón de Cancelar reutilizable
 * 
 * @param {Object} props
 * @param {string} props.children - Texto personalizado (default: 'Cancelar')
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {Function} props.onClick - Función que se ejecuta al hacer click
 * @param {string} props.variant - Variante del botón (default: 'secondary')
 * @param {string} props.size - Tamaño del botón
 */
const CancelButton = ({
  children = 'Cancelar',
  disabled = false,
  onClick,
  variant = 'secondary',
  size = 'md',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CancelButton;
