import api from './api';

/**
 * API service para gestión de líneas de investigación
 */
export const lineasAPI = {
  /**
   * Obtener líneas de investigación del estudiante logueado
   * @returns {Promise<Object>} Respuesta con líneas y programa
   */
  getLineasEstudiante: async () => {
    try {
      const response = await api.get('/lineas/programas/estudiante');
      return {
        success: true,
        data: response.data,
        lineas: response.data.lineas || [],
        programa: response.data.programa || null,
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('Error al obtener líneas de investigación:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Error al cargar líneas de investigación',
        data: null,
        lineas: [],
        programa: null,
        total: 0
      };
    }
  },

  /**
   * Obtener una línea de investigación específica por ID
   * @param {string} lineaId - ID de la línea de investigación
   * @returns {Promise<Object>} Respuesta con la línea específica
   */
  getLineaPorId: async (lineaId) => {
    try {
      const response = await api.get(`/lineas/${lineaId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error al obtener línea de investigación:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Error al cargar línea de investigación',
        data: null
      };
    }
  }
};
