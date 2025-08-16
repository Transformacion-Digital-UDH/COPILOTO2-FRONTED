import React from 'react';

const ButtonGuide = () => {
  return (
    <button
      className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
      aria-label="Abrir Guía"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export default ButtonGuide;
