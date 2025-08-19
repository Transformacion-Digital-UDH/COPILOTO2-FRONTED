import { useState, useEffect } from 'react';
import { designacionService } from '../services/designacionService';

/**
 * Hook para gestionar designaciones de asesores y jurados
 * Reutilizable para diferentes tipos de designaciones
 */
export const useDesignaciones = (tipo = 'asesor') => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [jurados, setJurados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, [tipo]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Cargar estudiantes según el tipo
      const estudiantesData = await designacionService.getEstudiantesPendientes(tipo);
      setEstudiantes(estudiantesData);

      // Cargar asesores o jurados según el tipo
      if (tipo === 'asesor' || tipo === 'both') {
        const asesoresData = await designacionService.getAsesoresDisponibles();
        setAsesores(asesoresData);
      }
      
      if (tipo === 'jurado' || tipo === 'both') {
        const juradosData = await designacionService.getJuradosDisponibles();
        setJurados(juradosData);
      }
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const designarAsesor = async (estudianteId, asesorId, observaciones = '') => {
    setLoading(true);
    setError(null);
    try {
      await designacionService.designarAsesor({
        estudiante_id: estudianteId,
        asesor_id: asesorId,
        observaciones
      });
      
      // Recargar datos y limpiar selección
      await loadData();
      setSelectedEstudiante(null);
      return { success: true };
    } catch (err) {
      setError('Error al designar asesor');
      console.error('Error designando asesor:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const designarJurado = async (estudianteId, juradoId, observaciones = '') => {
    setLoading(true);
    setError(null);
    try {
      await designacionService.designarJurado({
        estudiante_id: estudianteId,
        jurado_id: juradoId,
        observaciones
      });
      
      // Recargar datos y limpiar selección
      await loadData();
      setSelectedEstudiante(null);
      return { success: true };
    } catch (err) {
      setError('Error al designar jurado');
      console.error('Error designando jurado:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const aprobarTesis = async (estudianteId, observaciones = '') => {
    setLoading(true);
    setError(null);
    try {
      await designacionService.aprobarTesis({
        estudiante_id: estudianteId,
        observaciones
      });
      
      // Recargar datos
      await loadData();
      return { success: true };
    } catch (err) {
      setError('Error al aprobar tesis');
      console.error('Error aprobando tesis:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const rechazarTesis = async (estudianteId, observaciones = '') => {
    setLoading(true);
    setError(null);
    try {
      await designacionService.rechazarTesis({
        estudiante_id: estudianteId,
        observaciones
      });
      
      // Recargar datos
      await loadData();
      return { success: true };
    } catch (err) {
      setError('Error al rechazar tesis');
      console.error('Error rechazando tesis:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = async (estudianteId, nuevoEstado, observaciones = '') => {
    setLoading(true);
    setError(null);
    try {
      await designacionService.actualizarEstado({
        estudiante_id: estudianteId,
        estado: nuevoEstado,
        observaciones
      });
      
      // Recargar datos
      await loadData();
      return { success: true };
    } catch (err) {
      setError('Error al actualizar estado');
      console.error('Error actualizando estado:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados
    estudiantes,
    asesores,
    jurados,
    loading,
    error,
    selectedEstudiante,
    
    // Funciones de estado
    setSelectedEstudiante,
    
    // Acciones
    loadData,
    designarAsesor,
    designarJurado,
    aprobarTesis,
    rechazarTesis,
    actualizarEstado,
    
    // Utilidades
    refresh: loadData
  };
};
