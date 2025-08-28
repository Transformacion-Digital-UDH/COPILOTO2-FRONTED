import { useState, useEffect, useMemo } from 'react';
import { useLineasInvestigacion } from '../../../hooks/useLineasInvestigacion';

/**
 * Hook para manejar la selección de asesor técnico y líneas de investigación
 */
export const useAsesorSelection = () => {
  const [asesores, setAsesores] = useState([]);
  const [loadingAsesores, setLoadingAsesores] = useState(false);

  // Usar el hook de líneas de investigación
  const {
    lineas,
    programa,
    loading: loadingLineas,
    error: errorLineas,
    hasLineas,
    refetch: refetchLineas
  } = useLineasInvestigacion();

  // Datos mock para asesores - TODO: Reemplazar con API real
  const mockAsesores = [
    { value: 'asesor1', label: 'Dr. Carlos Mendoza Vega' },
    { value: 'asesor2', label: 'Dra. María Elena Rodríguez' },
    { value: 'asesor3', label: 'Dr. José Antonio Silva' },
    { value: 'asesor4', label: 'Dra. Ana Patricia Torres' }
  ];

  // Transformar líneas de investigación al formato esperado por FormField
  const lineasInvestigacion = useMemo(() => {
    if (!lineas || lineas.length === 0) return [];
    
    return lineas.map(linea => ({
      value: linea.id,
      label: linea.li_nombre
    }));
  }, [lineas]);

  // Cargar asesores (mock por ahora)
  useEffect(() => {
    setLoadingAsesores(true);
    // Simular carga de asesores
    setTimeout(() => {
      setAsesores(mockAsesores);
      setLoadingAsesores(false);
    }, 500);
  }, []);

  /**
   * Función para enviar la solicitud de asesor
   */
  const submitSolicitud = async (formData) => {
    setLoadingAsesores(true);
    
    try {
      // TODO: Implementar llamada real a la API
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Solicitud enviada:', {
            ...formData,
            programa: programa?.nombre,
            lineaNombre: lineas.find(l => l.id === formData.lineaInvestigacion)?.li_nombre
          });
          setLoadingAsesores(false);
          resolve({ 
            success: true, 
            message: 'Solicitud enviada correctamente',
            data: formData
          });
        }, 1000);
      });
    } catch (error) {
      setLoadingAsesores(false);
      throw error;
    }
  };

  /**
   * Función para obtener el nombre de una línea por su ID
   */
  const getLineaNombre = (lineaId) => {
    const linea = lineas.find(l => l.id === lineaId);
    return linea ? linea.li_nombre : '';
  };

  /**
   * Función para obtener el nombre de un asesor por su ID
   */
  const getAsesorNombre = (asesorId) => {
    const asesor = asesores.find(a => a.value === asesorId);
    return asesor ? asesor.label : '';
  };

  // Estados derivados
  const hasAsesores = asesores.length > 0;
  const isEmpty = !loadingLineas && !hasLineas;
  const isReady = hasAsesores && hasLineas && !loadingAsesores && !loadingLineas;

  return {
    // Datos
    asesores,
    lineasInvestigacion,
    programa,
    
    // Estados de carga
    loading: loadingAsesores || loadingLineas,
    loadingAsesores,
    loadingLineas,
    
    // Estados de error
    errorLineas,
    hasLineas,
    
    // Funciones
    submitSolicitud,
    getLineaNombre,
    getAsesorNombre,
    refetchLineas,
    
    // Estados derivados
    hasAsesores,
    isEmpty,
    isReady
  };
};
