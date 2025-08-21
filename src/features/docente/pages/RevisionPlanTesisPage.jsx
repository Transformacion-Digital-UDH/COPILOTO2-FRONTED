import { useState } from 'react';
import { CardContainer } from '../../../components/containers';
import RevisionPlanTesisTable from '../components/RevisionPlanTesisTable';
import { useRevisionPlanData } from '../hooks/useRevisionPlanData';
import { useRevisionPlanActions } from '../hooks/useRevisionPlanActions';

/**
 * Página para la revisión de plan de tesis
 * Sigue el mismo patrón que AceptarAsesoriaPage y DesignarAsesorPage
 */
const RevisionPlanTesisPage = () => {
  const { planesRevision, loading } = useRevisionPlanData();
  const { observarPlan, aprobarPlan } = useRevisionPlanActions();

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Filtrar planes según búsqueda y estado
  const planesFiltrados = planesRevision.filter(plan => {
    const matchBusqueda = !busqueda || 
      plan.tesista.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || plan.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleAction = async (accion, plan) => {
    try {
      switch (accion) {
        case 'observar':
          await observarPlan(plan.id);
          console.log('Plan observado para:', plan.tesista);
          break;
        
        case 'aprobar':
          await aprobarPlan(plan.id);
          console.log('Plan aprobado para:', plan.tesista);
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
      {/* Tabla de revisión de plan de tesis */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Revisión de Plan de Tesis
          </h1>
        </div>
        
        <RevisionPlanTesisTable
          data={planesFiltrados}
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

export default RevisionPlanTesisPage;
