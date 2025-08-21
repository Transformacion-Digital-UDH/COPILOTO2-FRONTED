import { useState } from 'react';
import { CardContainer } from '../../../components/containers';
import EmitirResolucionAprobacionTable from '../components/EmitirResolucionAprobacionTable';
import { useResolucionAprobacionData } from '../hooks/useResolucionAprobacionData';
import { useResolucionAprobacionActions } from '../hooks/useResolucionAprobacionActions';

/**
 * Página para emitir resolución de aprobación de Plan de tesis
 * Sigue el mismo patrón que EmitirResolucionPage y EmitirResolucionJuradoPage
 */
const EmitirResolucionAprobacionPage = () => {
  const { data: resoluciones, loading } = useResolucionAprobacionData();
  const { handleAprobar, handleRechazar, handleSolicitar } = useResolucionAprobacionActions();

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Filtrar resoluciones según búsqueda y estado
  const resolucionesFiltradas = resoluciones.filter(resolucion => {
    const matchBusqueda = !busqueda || 
      resolucion.tesista.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.juradoObjetante?.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.asesores.tecnico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.asesores.metodologico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.planTesis?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || resolucion.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleAction = async (accion, resolucion) => {
    try {
      switch (accion) {
        case 'rechazar':
          await handleRechazar(resolucion.id);
          console.log('Resolución de aprobación rechazada para:', resolucion.tesista);
          break;
        
        case 'aprobar':
          await handleAprobar(resolucion.id);
          console.log('Resolución de aprobación aprobada para:', resolucion.tesista);
          break;
        
        case 'solicitar':
          await handleSolicitar(resolucion.id);
          console.log('Información solicitada para:', resolucion.tesista);
          break;
        
        default:
          console.log('Acción no reconocida:', accion);
      }
    } catch (error) {
      console.error('Error al ejecutar acción:', error);
    }
  };

  const resetFiltros = () => {
    setBusqueda('');
    setFiltroEstado('');
  };

  return (
    <div className="w-full min-h-full space-y-8 p-6">
      {/* Tabla de emitir resolución de aprobación */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Emitir Resolución de aprobación de Plan de tesis
          </h1>
        </div>
        
        <EmitirResolucionAprobacionTable
          data={resolucionesFiltradas}
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

export default EmitirResolucionAprobacionPage;
