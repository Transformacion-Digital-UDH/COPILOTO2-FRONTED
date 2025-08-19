import { useState, useEffect } from 'react';

/**
 * Hook para manejar el estado del trámite de titulación
 * Persiste el estado en localStorage para mantener el progreso
 */
export const useTramiteState = () => {
  const [tramiteIniciado, setTramiteIniciado] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    const cargarEstadoTramite = () => {
      try {
        const estadoGuardado = localStorage.getItem('tesista_tramite_iniciado');
        setTramiteIniciado(estadoGuardado === 'true');
      } catch (error) {
        console.error('Error al cargar estado del trámite:', error);
        setTramiteIniciado(false);
      } finally {
        setLoading(false);
      }
    };

    cargarEstadoTramite();
  }, []);

  // Función para iniciar el trámite
  const iniciarTramite = () => {
    try {
      setTramiteIniciado(true);
      localStorage.setItem('tesista_tramite_iniciado', 'true');
      
      // También guardar fecha de inicio (opcional para analytics)
      const fechaInicio = new Date().toISOString();
      localStorage.setItem('tesista_tramite_fecha_inicio', fechaInicio);
      
      console.log('Trámite iniciado correctamente');
    } catch (error) {
      console.error('Error al iniciar trámite:', error);
    }
  };

  // Función para resetear el trámite (para testing o admin)
  const resetearTramite = () => {
    try {
      setTramiteIniciado(false);
      localStorage.removeItem('tesista_tramite_iniciado');
      localStorage.removeItem('tesista_tramite_fecha_inicio');
      
      console.log('Trámite reseteado');
    } catch (error) {
      console.error('Error al resetear trámite:', error);
    }
  };

  // Función para obtener información del trámite
  const obtenerInfoTramite = () => {
    try {
      const fechaInicio = localStorage.getItem('tesista_tramite_fecha_inicio');
      return {
        iniciado: tramiteIniciado,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : null,
        diasTranscurridos: fechaInicio 
          ? Math.floor((new Date() - new Date(fechaInicio)) / (1000 * 60 * 60 * 24))
          : 0
      };
    } catch (error) {
      console.error('Error al obtener info del trámite:', error);
      return {
        iniciado: tramiteIniciado,
        fechaInicio: null,
        diasTranscurridos: 0
      };
    }
  };

  return {
    // Estado
    tramiteIniciado,
    loading,
    
    // Acciones
    iniciarTramite,
    resetearTramite,
    
    // Información
    obtenerInfoTramite
  };
};
