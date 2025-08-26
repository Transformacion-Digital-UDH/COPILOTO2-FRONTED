import axios from 'axios';
import { isTokenExpired, clearSession } from '../utils/auth';

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar JWT token a las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar si el token no ha expirado
      if (isTokenExpired(token)) {
        console.warn('Token expirado, limpiando sesión');
        clearSession();
        window.location.href = '/login';
        return Promise.reject(new Error('Token expirado'));
      }
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token es inválido o hay error 401, limpiar localStorage y redirigir al login
    if (error.response?.status === 401) {
      console.warn('Error 401: Token inválido o expirado');
      clearSession();
      
      // Solo redirigir si no estamos en una ruta de auth
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/auth')) {
        window.location.href = '/login';
      }
    }
    
    // Errores 403: Sin permisos
    if (error.response?.status === 403) {
      console.warn('Error 403: Sin permisos suficientes');
    }
    
    return Promise.reject(error);
  }
);

export default api;