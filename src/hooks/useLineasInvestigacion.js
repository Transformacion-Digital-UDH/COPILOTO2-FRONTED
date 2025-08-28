import { useState, useEffect, useCallback } from 'react';
import { lineasAPI } from '../services/lineasAPI';

/**
 * Custom hook para manejar líneas de investigación del estudiante
 * @returns {Object} Estado y funciones para manejar líneas de investigación
 */
export const useLineasInvestigacion = () => {
  const [lineas, setLineas] = useState([]);
  const [programa, setPrograma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  /**
   * Función para obtener las líneas de investigación
   */
  const fetchLineas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await lineasAPI.getLineasEstudiante();
      
      if (response.success) {
        setLineas(response.lineas);
        setPrograma(response.programa);
        setTotal(response.total);
      } else {
        setError(response.error);
        setLineas([]);
        setPrograma(null);
        setTotal(0);
      }
    } catch (err) {
      console.error('Error en useLineasInvestigacion:', err);
      setError('Error inesperado al cargar líneas de investigación');
      setLineas([]);
      setPrograma(null);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Función para buscar una línea específica por ID
   */
  const findLineaById = useCallback((lineaId) => {
    return lineas.find(linea => linea.id === lineaId) || null;
  }, [lineas]);

  /**
   * Función para obtener el nombre de una línea por ID
   */
  const getLineaNombre = useCallback((lineaId) => {
    const linea = findLineaById(lineaId);
    return linea ? linea.li_nombre : '';
  }, [findLineaById]);

  // Efecto para cargar líneas al montar el componente
  useEffect(() => {
    fetchLineas();
  }, [fetchLineas]);

  return {
    // Estados
    lineas,
    programa,
    loading,
    error,
    total,
    
    // Funciones de utilidad
    refetch: fetchLineas,
    findLineaById,
    getLineaNombre,
    
    // Estados derivados
    hasLineas: lineas.length > 0,
    isEmpty: !loading && lineas.length === 0,
    hasError: !!error
  };
};
