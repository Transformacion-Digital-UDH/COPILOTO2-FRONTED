import React, { useState } from 'react';
import { CardContainer } from '../../../components/containers';
import ResolucionTable from '../components/ResolucionTable';
import { useResoluciones } from '../hooks/useResoluciones';

/**
 * Página para solicitar resolución de aprobación de plan de tesis - Programa Académico
 * Replica el diseño mostrado en la imagen de referencia y sigue el mismo patrón que las páginas anteriores
 */
const SolicitarResolucionPage = () => {
  const { 
    estudiantes, 
    loading, 
    solicitarResolucion,
    aprobarResolucion,
    rechazarResolucion,
    solicitarRevision
  } = useResoluciones();

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Datos mock que coinciden con la imagen
  const estudiantesMock = [
    {
      id: 1,
      estado: 'aprobado',
      tesista: 'Karol Andrea Peña Ramírez',
      asesor_tecnico: 'Cristiam Lopez',
      asesor_metodologico: 'Jenny Reynoso',
      jurado_objetante: 'Julio benavides'
    },
    {
      id: 2,
      estado: 'observado',
      tesista: 'Geraldine Córdova Agüero',
      asesor_tecnico: 'Julio Trigos',
      asesor_metodologico: 'Rosa Castro',
      jurado_objetante: 'Armando Paredes'
    },
    {
      id: 3,
      estado: 'pendiente',
      tesista: 'José Santos Chocano',
      asesor_tecnico: 'Julio Sanguineti',
      asesor_metodologico: 'Jenny Reynoso',
      jurado_objetante: 'Verónica Julca'
    }
  ];

  // Usar datos mock si no hay datos del hook
  const estudiantesData = estudiantes.length > 0 ? estudiantes : estudiantesMock;

  // Filtrar estudiantes según búsqueda y estado
  const estudiantesFiltrados = estudiantesData.filter(estudiante => {
    const matchBusqueda = !busqueda || 
      estudiante.tesista.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.asesor_tecnico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.asesor_metodologico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.jurado_objetante?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || estudiante.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleAction = async (accion, estudiante) => {
    try {
      switch (accion) {
        case 'aprobar':
          await aprobarResolucion(estudiante.id);
          console.log('Resolución aprobada para estudiante:', estudiante.tesista);
          break;
        
        case 'rechazar':
          await rechazarResolucion(estudiante.id, 'Rechazado desde la interfaz');
          console.log('Resolución rechazada para estudiante:', estudiante.tesista);
          break;
        
        case 'solicitar':
          await solicitarRevision(estudiante.id, 'Solicitud de revisión desde la interfaz');
          console.log('Revisión solicitada para estudiante:', estudiante.tesista);
          break;
        
        default:
          console.log('Acción no reconocida:', accion);
      }
    } catch (error) {
      console.error('Error al ejecutar acción:', error);
      // Aquí podrías mostrar una notificación de error
    }
  };

  const resetFiltros = () => {
    setBusqueda('');
    setFiltroEstado('');
  };

  return (
    <div className="w-full min-h-full space-y-8 p-6">
      {/* Tabla de solicitud de resolución */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Solicitar Resolución de Aprobación de Plan de Tesis
          </h1>
        </div>
        
        <ResolucionTable
          data={estudiantesFiltrados}
          onAction={handleAction}
          loading={loading}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          resetFiltros={resetFiltros}
        />
      </CardContainer>
    </div>
  );
};

export default SolicitarResolucionPage;
