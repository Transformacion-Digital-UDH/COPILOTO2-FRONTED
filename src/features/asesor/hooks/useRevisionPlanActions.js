import { useState } from 'react';

/**
 * Hook para manejar las acciones de revisión de plan de tesis
 * Sigue el mismo patrón que useAsesoriaActions
 */
export const useRevisionPlanActions = (tipoRevisor = 'tecnico') => {
  const [loading, setLoading] = useState(false);

  const observarPlan = async (planId) => {
    try {
      setLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Personalizar mensaje según el tipo de revisor
      const accionTexto = tipoRevisor === 'jurado' ? 'objetado' : 'observado';
      console.log(`Plan ${accionTexto} por ${tipoRevisor}:`, planId);
      
      // En producción aquí iría la llamada a la API específica por tipo
      // const response = await api.observarPlan(planId, tipoRevisor);
      
      const mensajes = {
        'tecnico': 'Plan observado técnicamente',
        'metodologico': 'Plan observado metodológicamente',
        'jurado': 'Plan objetado por jurado'
      };
      
      return { 
        success: true, 
        message: mensajes[tipoRevisor] || 'Plan observado correctamente' 
      };
    } catch (error) {
      console.error(`Error al observar plan como ${tipoRevisor}:`, error);
      return { success: false, message: `Error al observar el plan como ${tipoRevisor}` };
    } finally {
      setLoading(false);
    }
  };

  const aprobarPlan = async (planId) => {
    try {
      setLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Plan aprobado por ${tipoRevisor}:`, planId);
      
      // En producción aquí iría la llamada a la API específica por tipo
      // const response = await api.aprobarPlan(planId, tipoRevisor);
      
      const mensajes = {
        'tecnico': 'Plan aprobado técnicamente',
        'metodologico': 'Plan aprobado metodológicamente',
        'jurado': 'Conformidad dada por jurado objetante'
      };
      
      return { 
        success: true, 
        message: mensajes[tipoRevisor] || 'Plan aprobado correctamente' 
      };
    } catch (error) {
      console.error(`Error al aprobar plan como ${tipoRevisor}:`, error);
      return { success: false, message: `Error al aprobar el plan como ${tipoRevisor}` };
    } finally {
      setLoading(false);
    }
  };

  const rechazarPlan = async (planId) => {
    try {
      setLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Plan rechazado por ${tipoRevisor}:`, planId);
      
      // En producción aquí iría la llamada a la API específica por tipo
      // const response = await api.rechazarPlan(planId, tipoRevisor);
      
      const mensajes = {
        'tecnico': 'Plan rechazado técnicamente',
        'metodologico': 'Plan rechazado metodológicamente',
        'jurado': 'Plan rechazado por jurado objetante'
      };
      
      return { 
        success: true, 
        message: mensajes[tipoRevisor] || 'Plan rechazado correctamente' 
      };
    } catch (error) {
      console.error(`Error al rechazar plan como ${tipoRevisor}:`, error);
      return { success: false, message: `Error al rechazar el plan como ${tipoRevisor}` };
    } finally {
      setLoading(false);
    }
  };

  return {
    observarPlan,
    aprobarPlan,
    rechazarPlan,
    loading
  };
};
