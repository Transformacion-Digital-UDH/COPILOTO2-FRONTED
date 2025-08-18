import { useState, useEffect } from 'react';

/**
 * Hook para manejar los datos de aprobación del plan de tesis
 */
export const useAprobacionPlan = () => {
  const [loading, setLoading] = useState(false);
  const [aprobacionData, setAprobacionData] = useState({
    asesores: [],
    jurados: []
  });

  // Simulación de carga de datos
  useEffect(() => {
    const loadAprobacionData = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos mock
        const mockData = {
          asesores: [
            {
              id: 1,
              estado: 'aprobado', // Cambiado para usar el componente Estado
              tipo: 'Técnico',
              nombre: 'Freddy Vigilio Arratea',
              revision: 1,
              fechaEnvio: '15-07-25 | 15:36:14'
            },
            {
              id: 2,
              estado: 'pendiente', // Cambiado para usar el componente Estado
              tipo: 'Metodológico',
              nombre: 'Aldo Ramirez Chaupis',
              revision: 2,
              fechaEnvio: '15-07-25 | 15:36:14'
            }
          ],
          jurados: [
            {
              id: 1,
              estado: 'pendiente', // Cambiado de "NO INICIADO" a "pendiente"
              tipo: 'Objetante',
              nombre: 'Freddy Vigilio Arratea',
              revision: 1,
              fechaEnvio: '15-07-25 | 15:36:14'
            }
          ]
        };
        
        setAprobacionData(mockData);
      } catch (error) {
        console.error('Error al cargar datos de aprobación:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAprobacionData();
  }, []);

  const solicitarRevision = async (item) => {
    try {
      console.log(`Solicitar revisión - ${item.tipo}: ${item.nombre}, Revisión #${item.revision}`);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Aquí iría la lógica real para solicitar revisión
      return {
        success: true,
        message: `Solicitud de revisión enviada para ${item.nombre} (${item.tipo})`
      };
    } catch (error) {
      console.error('Error al solicitar revisión:', error);
      return {
        success: false,
        message: 'Error al enviar solicitud de revisión'
      };
    }
  };

  return {
    aprobacionData,
    loading,
    solicitarRevision
  };
};
