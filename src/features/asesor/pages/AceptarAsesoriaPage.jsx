import React, { useState } from 'react';
import { CardContainer } from '../../../components/containers';
import AsesoriaTable from '../components/AsesoriaTable';
import { useAsesoriaData } from '../hooks/useAsesoriaData';
import { useAsesoriaActions } from '../hooks/useAsesoriaActions';

/**
 * Página para la aceptación de asesoría
 * Sigue el mismo patrón que DesignarAsesorPage
 */
const AceptarAsesoriaPage = () => {
  const { solicitudes, loading } = useAsesoriaData();
  const { aceptarSolicitud, rechazarSolicitud, solicitarRevision } = useAsesoriaActions();

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Filtrar solicitudes según búsqueda y estado
  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    const matchBusqueda = !busqueda || 
      solicitud.tesista.toLowerCase().includes(busqueda.toLowerCase()) ||
      solicitud.asesorTecnico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      solicitud.asesorMetodologico?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || solicitud.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleAction = async (accion, solicitud) => {
    try {
      switch (accion) {
        case 'aceptar':
          await aceptarSolicitud(solicitud.id);
          console.log('Solicitud aceptada para:', solicitud.tesista);
          break;
        
        case 'rechazar':
          await rechazarSolicitud(solicitud.id);
          console.log('Solicitud rechazada para:', solicitud.tesista);
          break;
        
        case 'solicitar':
          await solicitarRevision(solicitud.id);
          console.log('Revisión solicitada para:', solicitud.tesista);
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
      {/* Tabla de aceptación de asesoría */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Aceptación de Asesoría
          </h1>
        </div>
        
        <AsesoriaTable
          data={solicitudesFiltradas}
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

export default AceptarAsesoriaPage;
