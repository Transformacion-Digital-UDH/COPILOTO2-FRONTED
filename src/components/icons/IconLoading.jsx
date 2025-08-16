import React from 'react';

const IconLoading = ({ className = "w-5 h-5 mr-2 animate-spin" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none"
        strokeDasharray="31.416" 
        strokeDashoffset="31.416"
      >
        <animate 
          attributeName="stroke-dasharray" 
          dur="2s" 
          values="0 31.416;15.708 15.708;0 31.416;0 31.416" 
          repeatCount="indefinite"
        />
        <animate 
          attributeName="stroke-dashoffset" 
          dur="2s" 
          values="0;-15.708;-31.416;-31.416" 
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default IconLoading;
