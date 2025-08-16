import { useState, useEffect } from 'react';

/**
 * Hook para manejar la selección de asesor técnico
 */
export const useAsesorSelection = () => {
  const [asesores, setAsesores] = useState([]);
  const [lineasInvestigacion, setLineasInvestigacion] = useState([]);
  const [loading, setLoading] = useState(false);

  // Datos mock para demo
  const mockAsesores = [
    { value: 'asesor1', label: 'Dr. Carlos Mendoza Vega' },
    { value: 'asesor2', label: 'Dra. María Elena Rodríguez' },
    { value: 'asesor3', label: 'Dr. José Antonio Silva' },
    { value: 'asesor4', label: 'Dra. Ana Patricia Torres' }
  ];

  const mockLineas = [
    { value: 'sistemas', label: 'Sistemas de Información' },
    { value: 'ia', label: 'Inteligencia Artificial' },
    { value: 'redes', label: 'Redes y Comunicaciones' },
    { value: 'software', label: 'Ingeniería de Software' },
    { value: 'seguridad', label: 'Seguridad Informática' }
  ];

  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    setTimeout(() => {
      setAsesores(mockAsesores);
      setLineasInvestigacion(mockLineas);
      setLoading(false);
    }, 500);
  }, []);

  const submitSolicitud = async (formData) => {
    setLoading(true);
    
    // Simular envío
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Solicitud enviada:', formData);
        setLoading(false);
        resolve({ success: true, message: 'Solicitud enviada correctamente' });
      }, 1000);
    });
  };

  return {
    asesores,
    lineasInvestigacion,
    loading,
    submitSolicitud
  };
};
