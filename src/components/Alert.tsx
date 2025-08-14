import React, { useState, useEffect } from 'react';

interface AlertProps {
  message: string[];
  type?: 'success' | 'error' | 'warning';
  duration?: number;
  onAlertHidden?: () => void;
}

const Alert: React.FC<AlertProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onAlertHidden 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Función para obtener el color del icono según el tipo
  const getIconColor = (): string => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  // Componente para renderizar el icono según el tipo
  const renderIcon = () => {
    const iconClasses = `w-10 h-10 mr-2 ${getIconColor()}`;
    
    if (type === 'success') {
      return (
        <div className={iconClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    }
    
    if (type === 'error') {
      return (
        <div className={iconClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      );
    }
    
    if (type === 'warning') {
      return (
        <div className={iconClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M5.22 4.22a8 8 0 0111.56 0A8 8 0 0112 20a8 8 0 01-6.78-11.78z"
            />
          </svg>
        </div>
      );
    }
    
    return null;
  };

  // useEffect para manejar el temporizador de auto-ocultación
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onAlertHidden) {
        onAlertHidden();
      }
    }, duration);

    // Cleanup function para limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, [duration, onAlertHidden]);

  // Si no es visible, no renderizar nada
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 p-4 rounded-lg shadow-lg bg-blue-600 text-white w-96">
      <div className="flex items-center">
        {renderIcon()}
        <div className="flex flex-col">
          {message.map((msg, index) => (
            <p key={index}>
              <span className="block"> - {msg} </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alert;
