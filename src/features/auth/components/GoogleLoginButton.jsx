import React from 'react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { useThemeStore } from '../../../hooks/useThemeStore';
import { Loader2 } from 'lucide-react';

// Ícono de Google SVG
const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Mock del componente GoogleLogin mejorado
const GoogleLogin = ({ disabled, callback, className, isLoading, isDark, ...props }) => (
  <button 
    onClick={() => callback({})} 
    disabled={disabled || isLoading}
    className={`
      flex items-center justify-center
      ${isDark 
        ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-500 text-gray-200' 
        : 'bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 text-gray-700'
      }
      border font-medium
      px-4 py-2.5 rounded-lg
      shadow-sm hover:shadow-md
      transition-all duration-200 
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      min-w-fit
      ${className}
    `}
  >
    {isLoading ? (
      <Loader2 className={`w-4 h-4 mr-2 animate-spin ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
    ) : (
      <GoogleIcon />
    )}
    <span className="text-sm font-medium whitespace-nowrap">
      {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}
    </span>
  </button>
);

const GoogleLoginButton = () => {
  const { isLoading, googleLogin } = useGoogleAuth();
  const { isDark } = useThemeStore();

  return (
    <div className="mb-6">
      <div className="flex justify-center">
        <GoogleLogin
          disabled={isLoading}
          isLoading={isLoading}
          isDark={isDark}
          className="mx-auto"
          callback={googleLogin}
          prompt
          popupMode={false}
        />
      </div>
    </div>
  );
};

export default GoogleLoginButton;