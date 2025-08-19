/**
 * Servicio para manejar operaciones de designación de jurados objetantes
 * Sigue el mismo patrón que designacionService con datos mock
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
    jurado_objetante: null
  },
  {
    id: 2,
    estado: 'observado',
    tesista: 'Geraldine Córdova Agüero',
    asesor_tecnico: 'Julio Trigos',
    asesor_metodologico: 'Rosa Castro',
    jurado_objetante: null
  },
  {
    id: 3,
    estado: 'pendiente',
    tesista: 'José Santos Chocano',
    asesor_tecnico: 'Julio Sanguineti',
    asesor_metodologico: 'Jenny Reynoso',
    jurado_objetante: null
  }
];

const juradosMock = [
  { id: 1, nombre: 'Dr. Carlos Mendoza Silva' },
  { id: 2, nombre: 'Dra. María González López' },
  { id: 3, nombre: 'Mg. Roberto Vásquez Torres' },
  { id: 4, nombre: 'Dr. Ana Lucía Fernández' },
  { id: 5, nombre: 'Mg. José Miguel Herrera' },
  { id: 6, nombre: 'Dra. Patricia Morales Cruz' }
];

export const juradoService = {
  /**
   * Obtener lista de estudiantes para designación de jurados
   */
  async obtenerEstudiantes() {
    await delay(800);
    
    try {
      // Simulación de llamada API
      const response = await fetch('/api/programa/jurados/estudiantes');
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, usando datos mock:', error.message);
      return [...estudiantesMock];
    }
  },

  /**
   * Obtener lista de jurados disponibles
   */
  async obtenerJurados() {
    await delay(600);
    
    try {
      const response = await fetch('/api/programa/jurados/disponibles');
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, usando datos mock:', error.message);
      return [...juradosMock];
    }
  },

  /**
   * Designar un jurado objetante a un estudiante
   */
  async designarJurado(estudianteId, juradoId, comentarios = '') {
    await delay(1000);
    
    try {
      const response = await fetch('/api/programa/jurados/designar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estudianteId,
          juradoId,
          comentarios,
          fecha: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Error al designar jurado');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, simulando designación:', error.message);
      
      // Simulación de respuesta exitosa
      return {
        success: true,
        message: 'Jurado objetante designado correctamente',
        data: {
          estudianteId,
          juradoId,
          fecha: new Date().toISOString()
        }
      };
    }
  },

  /**
   * Aprobar la designación de un jurado
   */
  async aprobarJurado(estudianteId) {
    await delay(800);
    
    try {
      const response = await fetch(`/api/programa/jurados/${estudianteId}/aprobar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Error al aprobar jurado');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, simulando aprobación:', error.message);
      
      return {
        success: true,
        message: 'Jurado objetante aprobado correctamente',
        estudianteId
      };
    }
  },

  /**
   * Rechazar la designación de un jurado
   */
  async rechazarJurado(estudianteId, comentarios = '') {
    await delay(800);
    
    try {
      const response = await fetch(`/api/programa/jurados/${estudianteId}/rechazar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios,
          fecha: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Error al rechazar jurado');
      return await response.json();
    } catch (error) {
      console.warn('API no disponible, simulando rechazo:', error.message);
      
      return {
        success: true,
        message: 'Jurado objetante rechazado',
        estudianteId,
        comentarios
      };
    }
  },

  /**
   * Solicitar revisión de la designación
   */
  async solicitarRevision(estudianteId, comentarios = '') {
    await delay(800);
    
    try {
      const response = await fetch(`/api/programa/jurados/${estudianteId}/solicitar-revision`, {
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
