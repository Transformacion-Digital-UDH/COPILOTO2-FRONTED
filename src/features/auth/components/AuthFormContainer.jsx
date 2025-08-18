import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import LoginForm from './LoginForm';

const AuthFormContainer = () => {
  return (
    <div className="w-full max-w-md rounded-lg px-8 py-6 self-center mx-auto shadow-lg dark:bg-gray-800/95 relative">
      
      <div className="text-center mb-5 relative">
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-base opacity-70 rounded-tl-lg"></div>
        <h6 className="text-2xl text-azul dark:text-gray-300 mb-4 tracking-wide">Iniciar sesión</h6>
        <p className="text-base text-gray-600 dark:text-gray-300 tracking-wide mb-3">
          Accede con tu correo institucional <span className="font-semibold">@udh.edu.pe</span>
        </p>
      </div>
      
      <GoogleLoginButton />
      
      {/* Divisor OR */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
            O continúa con
          </span>
        </div>
      </div>
      
      {/* Formulario de prueba */}
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
          🧪 Solo para pruebas (sin API)
        </p>
        <LoginForm />
      </div>
      
      <div className="mt-8 text-center">
        <a 
          target="_blank" 
          href="https://drive.google.com/file/d/1CpKYvq-dq0FhdASeGBHLQY_SfEjGOGgm/view" 
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          rel="noopener noreferrer"
        >
          ¿Necesitas ayuda? Mira esta guía.
        </a>
      </div>
    </div>
  );
};

export default AuthFormContainer;