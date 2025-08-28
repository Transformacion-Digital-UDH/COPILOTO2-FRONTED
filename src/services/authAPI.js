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

  // Login con formulario (email y password)
  loginFormulario: async (email, password) => {
    try {
      const response = await api.post('/auth/login-formulario', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Credenciales incorrectas' };
    }
  },

  // Completar perfil
  completeProfile: async (profileData) => {
    try {
      const response = await api.put('/usuarios/completar-perfil', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al completar el perfil' };
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