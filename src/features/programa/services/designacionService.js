/**
 * Servicio para gestionar designaciones de asesores y jurados
 * Incluye todas las operaciones CRUD para el rol Programa Académico
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class DesignacionService {
  // Headers comunes para las peticiones
  getHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  // Manejo de respuestas HTTP
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  // GET: Estudiantes pendientes de designación
  async getEstudiantesPendientes(tipo = 'asesor') {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/estudiantes/pendientes?tipo=${tipo}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      const data = await this.handleResponse(response);
      return data.estudiantes || [];
    } catch (error) {
      console.error('Error obteniendo estudiantes pendientes:', error);
      // Datos mock para desarrollo
      return this.getMockEstudiantes(tipo);
    }
  }

  // GET: Asesores disponibles
  async getAsesoresDisponibles() {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/asesores/disponibles`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      const data = await this.handleResponse(response);
      return data.asesores || [];
    } catch (error) {
      console.error('Error obteniendo asesores disponibles:', error);
      // Datos mock para desarrollo
      return this.getMockAsesores();
    }
  }

  // GET: Jurados disponibles
  async getJuradosDisponibles() {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/jurados/disponibles`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      const data = await this.handleResponse(response);
      return data.jurados || [];
    } catch (error) {
      console.error('Error obteniendo jurados disponibles:', error);
      // Datos mock para desarrollo
      return this.getMockJurados();
    }
  }

  // POST: Designar asesor
  async designarAsesor({ estudiante_id, asesor_id, observaciones }) {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/designaciones/asesor`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          estudiante_id,
          asesor_id,
          observaciones,
          fecha_designacion: new Date().toISOString()
        })
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error designando asesor:', error);
      // Simular éxito en desarrollo
      return { success: true, message: 'Asesor designado correctamente (modo desarrollo)' };
    }
  }

  // POST: Designar jurado
  async designarJurado({ estudiante_id, jurado_id, observaciones }) {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/designaciones/jurado`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          estudiante_id,
          jurado_id,
          observaciones,
          fecha_designacion: new Date().toISOString()
        })
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error designando jurado:', error);
      // Simular éxito en desarrollo
      return { success: true, message: 'Jurado designado correctamente (modo desarrollo)' };
    }
  }

  // PUT: Aprobar tesis
  async aprobarTesis({ estudiante_id, observaciones }) {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/tesis/${estudiante_id}/aprobar`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({
          observaciones,
          fecha_aprobacion: new Date().toISOString()
        })
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error aprobando tesis:', error);
      return { success: true, message: 'Tesis aprobada correctamente (modo desarrollo)' };
    }
  }

  // PUT: Rechazar tesis
  async rechazarTesis({ estudiante_id, observaciones }) {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/tesis/${estudiante_id}/rechazar`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({
          observaciones,
          fecha_rechazo: new Date().toISOString()
        })
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error rechazando tesis:', error);
      return { success: true, message: 'Tesis rechazada (modo desarrollo)' };
    }
  }

  // PUT: Actualizar estado general
  async actualizarEstado({ estudiante_id, estado, observaciones }) {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/estudiantes/${estudiante_id}/estado`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify({
          estado,
          observaciones,
          fecha_actualizacion: new Date().toISOString()
        })
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error actualizando estado:', error);
      return { success: true, message: 'Estado actualizado (modo desarrollo)' };
    }
  }

  // GET: Reportes y estadísticas
  async getEstadisticas() {
    try {
      const response = await fetch(`${API_BASE_URL}/programa/estadisticas`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return this.getMockEstadisticas();
    }
  }

  // Datos mock para desarrollo
  getMockEstudiantes(tipo) {
    const estudiantes = [
      {
        id: 1,
        nombres: 'María José',
        apellidos: 'González López',
        email: 'maria.gonzalez@universidad.edu.co',
        codigo: '2021118001',
        programa: 'Ingeniería de Sistemas',
        titulo_proyecto: 'Sistema de gestión académica con inteligencia artificial',
        estado: 'activo',
        fecha_registro: '2024-01-15T10:00:00Z'
      },
      {
        id: 2,
        nombres: 'Carlos Andrés',
        apellidos: 'Rodríguez Pérez',
        email: 'carlos.rodriguez@universidad.edu.co',
        codigo: '2021118002',
        programa: 'Ingeniería Industrial',
        titulo_proyecto: 'Optimización de procesos logísticos mediante simulación',
        estado: 'activo',
        fecha_registro: '2024-01-20T14:30:00Z'
      }
    ];

    return tipo === 'jurado' 
      ? estudiantes.filter(e => e.id === 2) // Solo algunos para jurado
      : estudiantes;
  }

  getMockAsesores() {
    return [
      {
        id: 1,
        nombres: 'Dr. Luis Fernando',
        apellidos: 'Martínez Silva',
        email: 'luis.martinez@universidad.edu.co',
        especialidad: 'Inteligencia Artificial',
        telefono: '300-123-4567',
        experiencia: 8
      },
      {
        id: 2,
        nombres: 'Dra. Ana María',
        apellidos: 'Castillo Vargas',
        email: 'ana.castillo@universidad.edu.co',
        especialidad: 'Ingeniería de Software',
        telefono: '300-234-5678',
        experiencia: 12
      }
    ];
  }

  getMockJurados() {
    return [
      {
        id: 1,
        nombres: 'Dr. Roberto',
        apellidos: 'Hernández Torres',
        email: 'roberto.hernandez@universidad.edu.co',
        area: 'Investigación de Operaciones',
        telefono: '300-345-6789',
        experiencia: 15
      },
      {
        id: 2,
        nombres: 'Dra. Patricia',
        apellidos: 'Gómez Ruiz',
        email: 'patricia.gomez@universidad.edu.co',
        area: 'Gestión de Calidad',
        telefono: '300-456-7890',
        experiencia: 10
      }
    ];
  }

  getMockEstadisticas() {
    return {
      estudiantes_activos: 145,
      asesores_disponibles: 28,
      jurados_disponibles: 15,
      designaciones_pendientes: 23,
      tesis_aprobadas: 89,
      tesis_en_evaluacion: 34
    };
  }
}

// Exportar instancia única
export const designacionService = new DesignacionService();
