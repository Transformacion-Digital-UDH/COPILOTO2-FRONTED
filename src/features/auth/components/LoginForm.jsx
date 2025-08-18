import React from 'react';
import { useAuthForm } from '../hooks/useAuthForm';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useThemeStore } from '../../../hooks/useThemeStore';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const { loading } = useAuthStore(); // O useContext si usas Context API
  const { isDark } = useThemeStore(); // Para acceder al tema actual
  const { 
    email, 
    setEmail,
    password, 
    setPassword,
    isPassword, 
    setIsPassword,
    normalizeEmail, 
    handleLogin 
  } = useAuthForm();

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label 
          className="block text-sm font-Poppins text-gray-700 dark:text-gray-300 mb-1" 
          htmlFor="email"
        >
          Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              normalizeEmail();
            }}
            className="w-full px-4 py-2 border border-emerald-500 dark:border-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 dark:bg-slate-800 dark:text-slate-300 bg-gray-50"
            required
            autoFocus
          />
        </div>

        <div className="relative mb-4">
          {password && (
            <div 
              className="absolute inset-y-11 right-3 flex items-center ps-3 cursor-pointer"
              onClick={() => setIsPassword(!isPassword)}
            >
              {isPassword ? (
                <Eye className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />
              ) : (
                <EyeOff className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            <label 
              className="block text-sm font-Poppins text-gray-700 dark:text-gray-300 mb-1" 
              htmlFor="password"
            >
              Contraseña
            </label>
          </div>

          <input
            type="text"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-emerald-500 dark:border-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 dark:bg-slate-800 dark:text-slate-300 bg-gray-50"
            required
            autoComplete="current-password"
            style={{ 
              WebkitTextSecurity: isPassword ? 'disc' : 'none',
              fontFamily: isPassword ? 'password' : 'inherit'
            }}
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className={`w-full py-3 font-medium uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white ${
              isDark 
                ? 'bg-emerald-700 hover:bg-emerald-500' 
                : 'bg-emerald-600 hover:bg-emerald-400'
            }`}
            disabled={loading}
          >
            {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            Iniciar Sesión
          </button>
        </div>
      </form>
  );
};

export default LoginForm;