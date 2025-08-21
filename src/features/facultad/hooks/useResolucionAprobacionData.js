import { useState, useEffect } from 'react';

// Datos de ejemplo para resoluciones de aprobación de Plan de tesis
const mockResolucionAprobacionData = [
  {
    id: 1,
    estado: "APROBADO",
    tesista: "Karol Andréa Peña Ramírez",
    asesores: {
      tecnico: "Cristiam Lopez",
      metodologico: "Jenny Reynoso"
    },
    juradoObjetante: "Julio benavides",
    fechaAprobacion: "15-08-25",
    planTesis: "Análisis de sistemas de información gerencial"
  },
  {
    id: 2,
    estado: "OBSERVADO", 
    tesista: "Geraldine Córdova Aguero",
    asesores: {
      tecnico: "Julio Trigos",
      metodologico: "Rosa Castro"
    },
    juradoObjetante: "Armando Paredes",
    fechaAprobacion: "14-08-25",
    planTesis: "Desarrollo de aplicaciones móviles"
  },
  {
    id: 3,
    estado: "PENDIENTE",
    tesista: "José Santos Chocano",
    asesores: {
      tecnico: "Julio Sanguineti",
      metodologico: "Jenny Reynoso"
    },
    juradoObjetante: "Verónica Julca",
    fechaAprobacion: "13-08-25",
    planTesis: "Inteligencia artificial en educación"
  }
];

export const useResolucionAprobacionData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setData(mockResolucionAprobacionData);
        setError(null);
      } catch (err) {
        setError('Error al cargar las resoluciones de aprobación');
        console.error('Error fetching resolucion aprobacion data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  return {
    data,
    loading,
    error,
    refreshData
  };
};
