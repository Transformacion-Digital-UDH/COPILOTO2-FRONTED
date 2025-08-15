// src/components/Modal.jsx
import { useEffect } from 'react';
import IconCerrar from './icons/IconCerrar';

export default function Modal({ open, onClose, className = 'w-[40rem]', children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto fade-in">
      <div className={`relative p-2 bg-[#FBFBFB] dark:bg-gray-700 rounded-xl mx-4 ${className}`}>
        {/* Cerrar */}
        <div className="flex justify-end">
          <button onClick={onClose} className="hover:scale-125 transition-transform duration-150">
            <IconCerrar />
          </button>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6 border-b-2 border-gray-200 dark:border-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}
