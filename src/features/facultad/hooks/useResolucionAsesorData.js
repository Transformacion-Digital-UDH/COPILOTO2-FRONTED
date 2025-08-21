import { useState, useEffect } from 'react';

/**
 * Hook para manejar los datos de resoluciones de designación de asesores
 * Sigue el mismo patrón que useAsesoriaData y useRevisionPlanData
 */
export const useResolucionAsesorData = () => {
  const [resoluciones, setResoluciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular carga de datos - en producción sería una llamada a API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Datos de ejemplo basados en la imagen
        const mockData = [
          {
            id: 1,
            estado: 'APROBADO',
            tesista: 'Karol Andréa Peña Ramírez',
            asesorTecnico: 'Aldo Ramírez Chaupis',
            asesorMetodologico: 'Julio Ramon Ribeyro',
            fechaDesignacion: '15-08-25'
          },
          {
            id: 2,
            estado: 'OBSERVADO',
            tesista: 'Geraldine Córdova Aguero',
            asesorTecnico: 'Juan Paredes Castro',
            asesorMetodologico: 'Julio Lopez Valdivia',
            fechaDesignacion: '14-08-25'
          },
          {
            id: 3,
            estado: 'PENDIENTE',
            tesista: 'José Santos Chocano',
            asesorTecnico: 'Freddy Vigilio Claros',
            asesorMetodologico: 'Carmen Aranda Milla',
            fechaDesignacion: '13-08-25'
          },
          {
            id: 4,
            estado: 'APROBADO',
            tesista: 'María Elena Vásquez',
            asesorTecnico: 'Luis Miguel Torres',
            asesorMetodologico: 'Ana Patricia Ruiz',
            fechaDesignacion: '12-08-25'
          },
          {
            id: 5,
            estado: 'OBSERVADO',
            tesista: 'Carlos Fernando López',
            asesorTecnico: 'Roberto Carlos Méndez',
            asesorMetodologico: 'Isabel Cristina Morales',
            fechaDesignacion: '11-08-25'
          },
          {
            id: 6,
            estado: 'PENDIENTE',
            tesista: 'Andrea Sofia Herrera',
            asesorTecnico: 'Miguel Angel Castillo',
            asesorMetodologico: 'Laura Patricia Silva',
            fechaDesignacion: '10-08-25'
          }
        ];
        
        setResoluciones(mockData);
        setError(null);
      } catch (err) {
        setError('Error al cargar las resoluciones');
        console.error('Error fetching resoluciones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    resoluciones,
    loading,
    error,
    setResoluciones
  };
};
