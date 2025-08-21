import { useState, useEffect } from 'react';

/**
 * Hook para manejar los datos de revisión de plan de tesis
 * Sigue el mismo patrón que useAsesoriaData
 */
export const useRevisionPlanData = () => {
  const [planesRevision, setPlanesRevision] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular carga de datos - en producción sería una llamada a API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Datos de ejemplo
        const mockData = [
          {
            id: 1,
            estado: 'APROBADO',
            tesista: 'Karol Andréa Peña Ramírez',
            tesis: 'DOC',
            nroRevision: 1,
            fecha: '15-07-25'
          },
          {
            id: 2,
            estado: 'OBSERVADO',
            tesista: 'Geraldine Brigitte Córdova Aguero',
            tesis: 'DOC',
            nroRevision: 2,
            fecha: '15-07-25'
          },
          {
            id: 3,
            estado: 'PENDIENTE',
            tesista: 'José Santos Chocano',
            tesis: 'DOC',
            nroRevision: 2,
            fecha: '15-07-25'
          },
          {
            id: 4,
            estado: 'APROBADO',
            tesista: 'Karol Andréa Peña Ramírez',
            tesis: 'DOC',
            nroRevision: 1,
            fecha: '15-07-25'
          },
          {
            id: 5,
            estado: 'OBSERVADO',
            tesista: 'Geraldine Brigitte Córdova Aguero',
            tesis: 'DOC',
            nroRevision: 2,
            fecha: '15-07-25'
          },
          {
            id: 6,
            estado: 'PENDIENTE',
            tesista: 'José Santos Chocano',
            tesis: 'DOC',
            nroRevision: 2,
            fecha: '15-07-25'
          }
        ];
        
        setPlanesRevision(mockData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los planes de tesis');
        console.error('Error fetching planes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    planesRevision,
    loading,
    error,
    setPlanesRevision
  };
};
