import { useState, useEffect } from 'react';

/**
 * Hook para manejar los datos de revisión de plan de tesis
 * Sigue el mismo patrón que useAsesoriaData
 */
export const useRevisionPlanData = (tipoRevisor = 'tecnico') => {
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
        
        // Datos de ejemplo diferenciados por tipo de revisor
        const mockDataBase = [
          {
            id: 1,
            estado: 'APROBADO',
            tesista: 'Karol Andréa Peña Ramírez',
            tesis: 'DOC',
            nroRevision: 1,
            fecha: '15-07-25',
            revisorTipo: tipoRevisor
          },
          {
            id: 2,
            estado: 'OBSERVADO',
            tesista: 'Geraldine Brigitte Córdova Aguero',
            tesis: 'DOC',
            nroRevision: 2,
            fecha: '15-07-25',
            revisorTipo: tipoRevisor
          },
          {
            id: 3,
            estado: 'PENDIENTE',
            tesista: 'José Santos Chocano',
            tesis: 'DOC',
            nroRevision: 2,
            fecha: '15-07-25',
            revisorTipo: tipoRevisor
          },
          {
            id: 4,
            estado: 'APROBADO',
            tesista: 'María González López',
            tesis: 'DOC',
            nroRevision: 1,
            fecha: '16-07-25',
            revisorTipo: tipoRevisor
          },
          {
            id: 5,
            estado: 'OBSERVADO',
            tesista: 'Carlos Mendoza Reyes',
            tesis: 'DOC',
            nroRevision: 3,
            fecha: '17-07-25',
            revisorTipo: tipoRevisor
          },
          {
            id: 6,
            estado: 'PENDIENTE',
            tesista: 'Ana Lucia Torres',
            tesis: 'DOC',
            nroRevision: 1,
            fecha: '18-07-25',
            revisorTipo: tipoRevisor
          }
        ];

        // Personalizar datos según el tipo de revisor (en producción esto vendría del backend)
        const mockData = mockDataBase.map(plan => ({
          ...plan,
          // Agregar información específica del tipo de revisor
          contexto: tipoRevisor === 'tecnico' ? 'Revisión técnica' : 
                   tipoRevisor === 'metodologico' ? 'Revisión metodológica' : 
                   'Revisión jurado objetante'
        }));
        
        setPlanesRevision(mockData);
        setError(null);
      } catch (err) {
        setError(`Error al cargar los planes de tesis para ${tipoRevisor}`);
        console.error('Error fetching planes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tipoRevisor]);

  return {
    planesRevision,
    loading,
    error,
    setPlanesRevision
  };
};
