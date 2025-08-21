import { useState } from 'react';
import { CardContainer } from '../../../components/containers';
import EmitirResolucionJuradoTable from '../components/EmitirResolucionJuradoTable';
import { useResolucionJuradoData } from '../hooks/useResolucionJuradoData';
import { useResolucionJuradoActions } from '../hooks/useResolucionJuradoActions';

/**
 * Página para emitir resolución de designación de jurado objetante
 * Sigue el mismo patrón que EmitirResolucionPage
 */
const EmitirResolucionJuradoPage = () => {
  const { data: resoluciones, loading } = useResolucionJuradoData();
  const { handleAprobar, handleRechazar, handleSolicitar } = useResolucionJuradoActions();

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Filtrar resoluciones según búsqueda y estado
  const resolucionesFiltradas = resoluciones.filter(resolucion => {
    const matchBusqueda = !busqueda || 
      resolucion.tesista.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.juradoObjetante?.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.asesores.tecnico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.asesores.metodologico?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || resolucion.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleAction = async (accion, resolucion) => {
    try {
      switch (accion) {
        case 'rechazar':
          await handleRechazar(resolucion.id);
          console.log('Resolución de jurado rechazada para:', resolucion.tesista);
          break;
        
        case 'aprobar':
          await handleAprobar(resolucion.id);
          console.log('Resolución de jurado aprobada para:', resolucion.tesista);
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
      {/* Tabla de emitir resolución de jurado objetante */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Emitir Resolución de Designación de Jurado objetante
          </h1>
        </div>
        
        <EmitirResolucionJuradoTable
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

export default EmitirResolucionJuradoPage;
