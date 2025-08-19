/**
 * Servicio para manejar operaciones de solicitud de resolución de aprobación de plan de tesis
 * Sigue el mismo patrón que designacionService y juradoService con datos mock
 */

// Simulación de delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Datos mock que coinciden con la imagen
const estudiantesMock = [
  {
    id: 1,
    estado: 'aprobado',
    tesista: 'Karol Andrea Peña Ramírez',
    asesor_tecnico: 'Cristiam Lopez',
    asesor_metodologico: 'Jenny Reynoso',
    jurado_objetante: 'Julio benavides',
    solicitud_resolucion: false
  },
  {
    id: 2,
    estado: 'observado',
    tesista: 'Geraldine Córdova Agüero',
    asesor_tecnico: 'Julio Trigos',
    asesor_metodologico: 'Rosa Castro',
    jurado_objetante: 'Armando Paredes',
    solicitud_resolucion: false
  },
  {
    id: 3,
    estado: 'pendiente',
    tesista: 'José Santos Chocano',
    asesor_tecnico: 'Julio Sanguineti',
    asesor_metodologico: 'Jenny Reynoso',
    jurado_objetante: 'Verónica Julca',
    solicitud_resolucion: false
  }
];

export const resolucionService = {
  /**
   * Obtener lista de estudiantes para solicitud de resolución
   */
  async obtenerEstudiantes() {
    await delay(800);
    
    try {
      // Simulación de llamada API
      const response = await fetch('/api/programa/resoluciones/estudiantes');
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, usando datos mock:', error.message);
      return [...estudiantesMock];
    }
  },

  /**
   * Solicitar resolución de aprobación para un estudiante
   */
  async solicitarResolucion(estudianteId, comentarios = '') {
    await delay(1000);
    
    try {
      const response = await fetch('/api/programa/resoluciones/solicitar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estudianteId,
          comentarios,
          fecha: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Error al solicitar resolución');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, simulando solicitud de resolución:', error.message);
      
      // Simulación de respuesta exitosa
      return {
        success: true,
        message: 'Solicitud de resolución enviada correctamente',
        data: {
          estudianteId,
          comentarios,
          fecha: new Date().toISOString()
        }
      };
    }
  },

  /**
   * Aprobar la solicitud de resolución
   */
  async aprobarResolucion(estudianteId) {
    await delay(800);
    
    try {
      const response = await fetch(`/api/programa/resoluciones/${estudianteId}/aprobar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Error al aprobar resolución');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, simulando aprobación:', error.message);
      
      return {
        success: true,
        message: 'Resolución aprobada correctamente',
        estudianteId
      };
    }
  },

  /**
   * Rechazar la solicitud de resolución
   */
  async rechazarResolucion(estudianteId, comentarios = '') {
    await delay(800);
    
    try {
      const response = await fetch(`/api/programa/resoluciones/${estudianteId}/rechazar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios,
          fecha: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Error al rechazar resolución');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, simulando rechazo:', error.message);
      
      return {
        success: true,
        message: 'Resolución rechazada',
        estudianteId,
        comentarios
      };
    }
  },

  /**
   * Solicitar revisión de la resolución
   */
  async solicitarRevision(estudianteId, comentarios = '') {
    await delay(800);
    
    try {
      const response = await fetch(`/api/programa/resoluciones/${estudianteId}/solicitar-revision`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios,
          fecha: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Error al solicitar revisión');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, simulando solicitud de revisión:', error.message);
      
      return {
        success: true,
        message: 'Revisión solicitada correctamente',
        estudianteId,
        comentarios
      };
    }
  }
};
