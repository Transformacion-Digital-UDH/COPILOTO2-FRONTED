import React from 'react';
import Modal from './Modal.jsx';
import { ActionContainer } from './containers';
import AcceptButton from './AcceptButton.jsx';
import CancelButton from './CancelButton.jsx';

/**
 * Modal de confirmación reutilizable
 * 
 * @param {Object} props
 * @param {boolean} props.open - Si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onConfirm - Función que se ejecuta al confirmar
 * @param {string} props.title - Título del modal
 * @param {string} props.message - Mensaje del modal
 * @param {string} props.confirmText - Texto del botón de confirmar (default: 'Aceptar')
 * @param {string} props.cancelText - Texto del botón de cancelar (default: 'Cancelar')
 * @param {string} props.variant - Variante del modal ('info', 'warning', 'error', 'success')
 * @param {boolean} props.loading - Estado de carga del botón confirmar
 */
const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = '¿Está seguro?',
  message = '¿Desea continuar con esta acción?',
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  variant = 'info',
  loading = false
}) => {
  const variantStyles = {
    info: {
      icon: '❓',
      titleClass: 'text-blue-600 dark:text-blue-400'
    },
    warning: {
      icon: '⚠️',
      titleClass: 'text-yellow-600 dark:text-yellow-400'
    },
    error: {
      icon: '⚠️',
      titleClass: 'text-red-600 dark:text-red-400'
    },
    success: {
      icon: '✓',
      titleClass: 'text-green-600 dark:text-green-400'
    }
  };

  const currentStyle = variantStyles[variant] || variantStyles.info;

  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  const content = (
    <div className="text-center space-y-4">
      {/* Icono */}
      <div className="text-4xl mb-4">
        {currentStyle.icon}
      </div>
      
      {/* Título */}
      <h3 className={`text-xl font-semibold ${currentStyle.titleClass}`}>
        {title}
      </h3>
      
      {/* Mensaje */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {message}
      </p>
    </div>
  );

  const actions = (
    <div className="w-full p-6">
      <ActionContainer align="right">
        <CancelButton
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </CancelButton>
        
        <AcceptButton
          onClick={handleConfirm}
          loading={loading}
          variant={variant === 'error' ? 'danger' : variant === 'warning' ? 'warning' : variant === 'success' ? 'success' : 'primary'}
          loadingText="Procesando..."
        >
          {confirmText}
        </AcceptButton>
      </ActionContainer>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={loading ? () => {} : onClose} // No permitir cerrar si está cargando
      content={content}
      actions={actions}
      className="w-full max-w-md"
    />
  );
};

export default ConfirmModal;
