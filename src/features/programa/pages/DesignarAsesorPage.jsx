import React, { useState } from 'react';
import { PageContainer, CardContainer } from '../../../components/containers';
import { FilterContainer } from '../../../components/containers';
import FormField from '../../../components/FormField';
import DesignacionTable from '../components/DesignacionTable';
import { useDesignaciones } from '../hooks/useDesignaciones';

/**
 * Página para designar asesores a estudiantes - Programa Académico
 * Replica el diseño mostrado en la imagen de referencia
 */
const DesignarAsesorPage = () => {
  const { 
    estudiantes, 
    asesores, 
    loading, 
    designarAsesor
  } = useDesignaciones('asesor');

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  // Datos mock que coincidan con la imagen
  const estudiantesMock = [
    {
      id: 1,
      estado: 'aprobado',
      tesista: 'Karol Andrea Peña Ramírez',
      asesor_tecnico: 'Aldo Ramirez Chaupis',
      asesor_metodologico: null
    },
    {
      id: 2,
      estado: 'observado',
      tesista: 'Geraldine Córdova Agüero',
      asesor_tecnico: 'Juan Paredes Castro',
      asesor_metodologico: null
    },
    {
      id: 3,
      estado: 'pendiente',
      tesista: 'José Santos Chocano',
      asesor_tecnico: 'Freddy Vigilio Claros',
      asesor_metodologico: null
    }
  ];

  // Filtrar estudiantes según búsqueda y estado
  const estudiantesFiltrados = estudiantesMock.filter(estudiante => {
    const matchBusqueda = !busqueda || 
      estudiante.tesista.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.asesor_tecnico?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || estudiante.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleDesignarAsesor = async (estudianteId, asesorId) => {
    try {
      await designarAsesor(estudianteId, asesorId, '');
      setSelectedEstudiante(null);
    } catch (error) {
      console.error('Error al designar asesor:', error);
    }
  };

  const handleAction = (accion, estudiante) => {
    switch (accion) {
      case 'aprobar':
        console.log('Aprobar estudiante:', estudiante.id);
        break;
      case 'rechazar':
        console.log('Rechazar estudiante:', estudiante.id);
        break;
      case 'solicitar':
        console.log('Solicitar revisión estudiante:', estudiante.id);
        break;
      default:
        console.log('Acción no reconocida:', accion);
    }
  };

  const resetFiltros = () => {
    setBusqueda('');
    setFiltroEstado('');
  };

  return (
    <div className="w-full min-h-full space-y-8 p-6">
      {/* Tabla de designación de asesores */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Designación de Asesores
          </h1>
        </div>
        
        <DesignacionTable
          data={estudiantesFiltrados}
          onAction={handleAction}
          loading={loading}
        />
      </CardContainer>
    </div>
  );
};

export default DesignarAsesorPage;
