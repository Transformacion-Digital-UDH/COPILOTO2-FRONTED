import React from 'react';
import Button from './Button.jsx';

/**
 * Botón de Aceptar/Confirmar reutilizable
 * 
 * @param {Object} props
 * @param {string} props.children - Texto personalizado (default: 'Aceptar')
 * @param {boolean} props.loading - Estado de carga
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {Function} props.onClick - Función que se ejecuta al hacer click
 * @param {string} props.variant - Variante del botón (default: 'primary')
 * @param {string} props.size - Tamaño del botón
 * @param {string} props.loadingText - Texto durante la carga (default: 'Procesando...')
 */
const AcceptButton = ({
  children = 'Aceptar',
  loading = false,
  disabled = false,
  onClick,
  variant = 'primary',
  size = 'md',
  loadingText = 'Procesando...',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default AcceptButton;
