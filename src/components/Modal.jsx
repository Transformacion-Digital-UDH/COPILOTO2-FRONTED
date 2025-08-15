import React, { useEffect } from "react";

const Modal = ({
  open,
  className = "w-[40rem]",
  onClose,
  content,
  actions,
}) => {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`relative p-2 bg-white dark:bg-gray-700 rounded-xl mx-4 shadow-2xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <div className="flex justify-end items-end">
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="hover:scale-125 transition-transform duration-150 ease-in-out"
          >
            {/* Aquí puedes usar tu icono de cerrar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6 border-b-2 border-gray-200 dark:border-gray-600 w-full">
          {content}
        </div>

        {/* Acciones */}
        <div className="flex">{actions}</div>
      </div>
    </div>
  );
};

export default Modal;
