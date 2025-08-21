import { useState, useEffect } from 'react';

/**
 * Hook para manejar los datos de solicitudes de asesoría
 */
export const useAsesoriaData = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tesista: '',
    asesorTecnico: '',
    asesorMetodologico: '',
    estado: 'todos'
  });

  // Datos de ejemplo para demostración que coinciden con la imagen
  const mockSolicitudes = [
    {
      id: 1,
      tesista: 'Karol Andréa Peña Ramírez',
      asesorTecnico: 'Aldo Ramirez Choquis',
      asesorMetodologico: '',
      estado: 'aprobado',
      fechaSolicitud: '15-07-25'
    },
    {
      id: 2,
      tesista: 'Geraldine Brigitte Córdova Aguero',
      asesorTecnico: 'Juan Paredes Castro',
      asesorMetodologico: '',
      estado: 'observado',
      fechaSolicitud: '15-07-25'
    },
    {
      id: 3,
      tesista: 'José Santos Chocano',
      asesorTecnico: 'Freddy Vigilio Claros',
      asesorMetodologico: '',
      estado: 'pendiente',
      fechaSolicitud: '15-07-25'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setSolicitudes(mockSolicitudes);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filtrar solicitudes según los filtros aplicados
  const filteredSolicitudes = solicitudes.filter(solicitud => {
    if (filters.tesista && !solicitud.tesista.toLowerCase().includes(filters.tesista.toLowerCase())) {
      return false;
    }
    if (filters.asesorTecnico && !solicitud.asesorTecnico.toLowerCase().includes(filters.asesorTecnico.toLowerCase())) {
      return false;
    }
    if (filters.asesorMetodologico && !solicitud.asesorMetodologico.toLowerCase().includes(filters.asesorMetodologico.toLowerCase())) {
      return false;
    }
    if (filters.estado !== 'todos' && solicitud.estado !== filters.estado) {
      return false;
    }
    return true;
  });

  return {
    solicitudes: filteredSolicitudes,
    loading,
    filters,
    updateFilters
  };
};
