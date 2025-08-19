import { useState, useEffect } from 'react';
import { resolucionService } from '../services/resolucionService';

/**
 * Hook para manejar la lógica de solicitud de resolución de aprobación de plan de tesis
 * Sigue el mismo patrón que useDesignaciones y useJurados
 */
export const useResoluciones = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const estudiantesData = await resolucionService.obtenerEstudiantes();
        
        setEstudiantes(estudiantesData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar datos de resoluciones:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const solicitarResolucion = async (estudianteId, comentarios = '') => {
    try {
      setLoading(true);
      const resultado = await resolucionService.solicitarResolucion(estudianteId, comentarios);
      
      // Actualizar el estado local
      setEstudiantes(prev => 
        prev.map(est => 
          est.id === estudianteId 
            ? { ...est, estado: 'pendiente', solicitud_resolucion: true }
            : est
        )
      );
      
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const aprobarResolucion = async (estudianteId) => {
    try {
      setLoading(true);
      const resultado = await resolucionService.aprobarResolucion(estudianteId);
      
      setEstudiantes(prev =>
        prev.map(est =>
          est.id === estudianteId
            ? { ...est, estado: 'aprobado' }
            : est
        )
      );
      
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rechazarResolucion = async (estudianteId, comentarios = '') => {
    try {
      setLoading(true);
      const resultado = await resolucionService.rechazarResolucion(estudianteId, comentarios);
      
      setEstudiantes(prev =>
        prev.map(est =>
          est.id === estudianteId
            ? { ...est, estado: 'observado' }
            : est
        )
      );
      
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const solicitarRevision = async (estudianteId, comentarios = '') => {
    try {
      setLoading(true);
      const resultado = await resolucionService.solicitarRevision(estudianteId, comentarios);
      
      setEstudiantes(prev =>
        prev.map(est =>
          est.id === estudianteId
            ? { ...est, estado: 'observado' }
            : est
        )
      );
      
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    estudiantes,
    loading,
    error,
    solicitarResolucion,
    aprobarResolucion,
    rechazarResolucion,
    solicitarRevision
  };
};
