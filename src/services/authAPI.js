import api from './api';

// Servicios de autenticación
export const authAPI = {
  // Login con Google
  loginGoogle: async (googleToken) => {
    try {
      const response = await api.post('/auth/login-google', {
        token: googleToken
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error en el login con Google' };
    }
  },

  // Obtener perfil del usuario
  getUserProfile: async () => {
    try {
      const response = await api.get('/usuarios/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el perfil' };
    }
  },

  // Verificar token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify-token');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Token inválido' };
    }
  },

  // Refrescar token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al refrescar token' };
    }
  }
};

export default authAPI;