import React from 'react';

const ButtonYoutube = () => {
  return (
    <button
      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
      aria-label="Abrir YouTube"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm5.5 8.5l5-3-5-3v6z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export default ButtonYoutube;
