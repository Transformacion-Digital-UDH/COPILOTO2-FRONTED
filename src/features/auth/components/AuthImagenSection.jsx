import React from 'react';
import './AuthImageSection.css';

const AuthImageSection = () => {
  return (
    <div className="login-image-section">
      <div className="absolute inset-0 bg-[url('/img/3.webp')] dark:grayscale bg-cover bg-center bg-no-repeat"></div>
      <div className="absolute inset-0 bg-gradient-to-b dark:from-black/80 dark:to-black/50"></div>
      
      <div className="absolute top-6 right-6">
        <img 
          src="/img/logo_dark.svg" 
          alt="Logo" 
          className="w-40 bg-gray-800/95 rounded-xl p-2 animate-bounce dark:block hidden" 
        />
        <img 
          src="/img/logo_light.svg" 
          alt="Logo" 
          className="w-40 bg-white/85 rounded-xl p-2 animate-bounce dark:hidden" 
        />
      </div>
    </div>
  );
};

export default AuthImageSection;