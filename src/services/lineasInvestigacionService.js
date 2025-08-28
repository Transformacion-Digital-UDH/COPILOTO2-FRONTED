import api from './api';

/**
 * Servicio para manejar líneas de investigación
 */
export const lineasInvestigacionService = {

  /**
   * 🎯 GET /api/lineas/programas/estudiante
   * Obtener líneas de investigación del programa del estudiante (requiere JWT)
   * @returns {Promise<Object>} Respuesta con las líneas de investigación
   */
  getLineasPorPrograma: async () => {
    try {
      const response = await api.get('/lineas/programas/estudiante');
      
      const lineas = response.data.data || response.data.lineas || response.data || [];
      
      return {
        success: true,
        data: lineas,
        message: response.data.message || 'Líneas obtenidas exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar líneas de investigación',
        data: []
      };
    }
  },

  /**
   * 🎯 GET /api/lineas/{id}
   * Obtener detalles de una línea de investigación específica
   * @param {number|string} lineaId - ID de la línea de investigación
   * @returns {Promise<Object>}
   */
  getLineaById: async (lineaId) => {
    try {
      const response = await api.get(`/lineas/${lineaId}`);
      
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al obtener detalles de la línea',
        data: null
      };
    }
  },

  /**
   * 🎯 GET /api/asesores/linea/{lineaId}
   * Obtener asesores disponibles por línea de investigación
   * @param {number|string} lineaId - ID de la línea de investigación
   * @returns {Promise<Object>}
   */
  getAsesoresPorLinea: async (lineaId) => {
    try {
      // Temporalmente usar mock hasta encontrar el endpoint correcto
      
      // Mock data filtrado por línea
      const mockAsesoresPorLinea = {
        'sistemas': [
          { id: 1, nombres: 'Carlos', apellidos: 'Mendoza Vega', grado: 'Dr.' },
          { id: 3, nombres: 'José Antonio', apellidos: 'Silva Torres', grado: 'Dr.' }
        ],
        'ia': [
          { id: 2, nombres: 'María Elena', apellidos: 'Rodríguez Silva', grado: 'Dra.' }
        ],
        'redes': [
          { id: 1, nombres: 'Carlos', apellidos: 'Mendoza Vega', grado: 'Dr.' }
        ],
        'software': [
          { id: 3, nombres: 'José Antonio', apellidos: 'Silva Torres', grado: 'Dr.' }
        ],
        'seguridad': [
          { id: 1, nombres: 'Carlos', apellidos: 'Mendoza Vega', grado: 'Dr.' }
        ]
      };

      const asesoresFiltrados = mockAsesoresPorLinea[lineaId] || mockAsesoresPorLinea['sistemas'];

      return {
        success: true,
        data: asesoresFiltrados,
        message: `Asesores para línea ${lineaId} (datos temporales)`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar asesores',
        data: []
      };
    }
  },

  /**
   * 🎯 GET /api/asesores (o el endpoint correcto)
   * Obtener todos los asesores disponibles
   * @returns {Promise<Object>}
   */
  getAllAsesores: async () => {
    try {
      // Por ahora usar datos mock mientras se encuentra el endpoint correcto
      
      // Mock data mientras encontramos el endpoint correcto
      const mockAsesores = [
        {
          id: 1,
          nombres: 'Carlos',
          apellidos: 'Mendoza Vega',
          grado: 'Dr.',
          especialidad: 'Sistemas de Información',
          email: 'cmendoza@udh.edu.pe'
        },
        {
          id: 2,
          nombres: 'María Elena',
          apellidos: 'Rodríguez Silva',
          grado: 'Dra.',
          especialidad: 'Inteligencia Artificial',
          email: 'mrodriguez@udh.edu.pe'
        },
        {
          id: 3,
          nombres: 'José Antonio',
          apellidos: 'Silva Torres',
          grado: 'Dr.',
          especialidad: 'Ingeniería de Software',
          email: 'jsilva@udh.edu.pe'
        }
      ];

      return {
        success: true,
        data: mockAsesores,
        message: 'Asesores cargados (datos temporales)'
      };

      /* 
      // Código real cuando sepamos el endpoint correcto:
      const response = await api.get('/el-endpoint-correcto-aqui');
      
      return {
        success: true,
        data: response.data.data || response.data || []
      };
      */
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al cargar asesores',
        data: []
      };
    }
  },

  /**
   * 🎯 POST /api/solicitudes/asesor
   * Enviar solicitud de asesor técnico
   * @param {Object} solicitudData - Datos de la solicitud
   * @returns {Promise<Object>}
   */
  enviarSolicitudAsesor: async (solicitudData) => {
    try {
      const response = await api.post('/solicitudes/asesor', {
        titulo_tesis: solicitudData.tituloTesis,
        asesor_id: parseInt(solicitudData.asesorTecnico),
        linea_investigacion_id: parseInt(solicitudData.lineaInvestigacion)
      });
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Solicitud enviada exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al enviar solicitud'
      };
    }
  }
};

export default lineasInvestigacionService;
