import { useState } from 'react';
import { CardContainer } from '../../../components/containers';
import EmitirResolucionAsesorTable from '../components/EmitirResolucionAsesorTable';
import { useResolucionAsesorData } from '../hooks/useResolucionAsesorData';
import { useResolucionAsesorActions } from '../hooks/useResolucionAsesorActions';

/**
 * Página para emitir resolución de designación de asesores
 * Sigue el mismo patrón que AceptarAsesoriaPage y RevisionPlanTesisPage
 */
const EmitirResolucionAsesorPage = () => {
  const { resoluciones, loading } = useResolucionAsesorData();
  const { rechazarResolucion, aprobarResolucion, solicitarRevision } = useResolucionAsesorActions();

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Filtrar resoluciones según búsqueda y estado
  const resolucionesFiltradas = resoluciones.filter(resolucion => {
    const matchBusqueda = !busqueda || 
      resolucion.tesista.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.asesorTecnico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      resolucion.asesorMetodologico?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || resolucion.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleAction = async (accion, resolucion) => {
    try {
      switch (accion) {
        case 'rechazar':
          await rechazarResolucion(resolucion.id);
          console.log('Resolución rechazada para:', resolucion.tesista);
          break;
        
        case 'aprobar':
          await aprobarResolucion(resolucion.id);
          console.log('Resolución aprobada para:', resolucion.tesista);
          break;
        
        case 'solicitar':
          await solicitarRevision(resolucion.id);
          console.log('Revisión solicitada para:', resolucion.tesista);
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
      {/* Tabla de emitir resolución */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Emitir Resolución de designación de Asesores
          </h1>
        </div>
        
        <EmitirResolucionAsesorTable
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

export default EmitirResolucionAsesorPage;
