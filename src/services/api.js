import axios from 'axios';

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
    // Si el token es inválido, limpiar localStorage y redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Solo redirigir si no estamos en una ruta de auth
      if (!window.location.pathname.includes('/auth')) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;