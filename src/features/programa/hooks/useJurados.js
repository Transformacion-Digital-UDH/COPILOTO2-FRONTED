import { useState, useEffect } from 'react';
import { juradoService } from '../services/juradoService';

/**
 * Hook para manejar la lógica de designación de jurados objetantes
 * Sigue el mismo patrón que useDesignaciones
 */
export const useJurados = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [jurados, setJurados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [estudiantesData, juradosData] = await Promise.all([
          juradoService.obtenerEstudiantes(),
          juradoService.obtenerJurados()
        ]);
        
        setEstudiantes(estudiantesData);
        setJurados(juradosData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar datos de jurados:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const designarJurado = async (estudianteId, juradoId, comentarios = '') => {
    try {
      setLoading(true);
      const resultado = await juradoService.designarJurado(estudianteId, juradoId, comentarios);
      
      // Actualizar el estado local
      setEstudiantes(prev => 
        prev.map(est => 
          est.id === estudianteId 
            ? { ...est, jurado_objetante: juradoId, estado: 'pendiente' }
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

  const aprobarJurado = async (estudianteId) => {
    try {
      setLoading(true);
      const resultado = await juradoService.aprobarJurado(estudianteId);
      
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

  const rechazarJurado = async (estudianteId, comentarios = '') => {
    try {
      setLoading(true);
      const resultado = await juradoService.rechazarJurado(estudianteId, comentarios);
      
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
      const resultado = await juradoService.solicitarRevision(estudianteId, comentarios);
      
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
    jurados,
    loading,
    error,
    designarJurado,
    aprobarJurado,
    rechazarJurado,
    solicitarRevision
  };
};
