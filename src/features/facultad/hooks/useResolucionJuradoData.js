import { useState, useEffect } from 'react';

// Datos de ejemplo para resoluciones de jurado objetante
const mockResolucionJuradoData = [
  {
    id: 1,
    estado: "APROBADO",
    tesista: "Karol Andréa Peña Ramírez",
    asesores: {
      tecnico: "Cristiam Lopez",
      metodologico: "Jenny Reynoso"
    },
    juradoObjetante: "Julio benavides",
    fechaDesignacion: "15-08-25"
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
    fechaDesignacion: "14-08-25"
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
    fechaDesignacion: "13-08-25"
  }
];

export const useResolucionJuradoData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setData(mockResolucionJuradoData);
        setError(null);
      } catch (err) {
        setError('Error al cargar las resoluciones de jurado objetante');
        console.error('Error fetching resolucion jurado data:', err);
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
