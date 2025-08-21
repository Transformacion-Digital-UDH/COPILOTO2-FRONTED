import { useState } from 'react';
import PropTypes from 'prop-types';
import { CardContainer } from '../../../components/containers';
import RevisionPlanTesisTable from './RevisionPlanTesisTable';
import { useRevisionPlanData } from '../hooks/useRevisionPlanData';
import { useRevisionPlanActions } from '../hooks/useRevisionPlanActions';

/**
 * Componente base reutilizable para la revisión de plan de tesis
 * Permite diferentes tipos de revisores con confirmaciones específicas
 */
const RevisionPlanTesisBase = ({ 
  tipoRevisor, 
  titulo, 
  accionesPersonalizadas = null 
}) => {
  const { planesRevision, loading } = useRevisionPlanData(tipoRevisor);
  const { observarPlan, aprobarPlan } = useRevisionPlanActions(tipoRevisor);

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

  // Definir acciones específicas según el tipo de revisor
  const getAccionesEspecificas = () => {
    const accionesPorTipo = {
      'tecnico': [
        { id: 'observar', label: 'Observar', variant: 'outline', icon: '⚠️' },
        { id: 'aprobar', label: 'Aprobar Técnicamente', variant: 'primary', icon: '✓' }
      ],
      'metodologico': [
        { id: 'observar', label: 'Observar', variant: 'outline', icon: '⚠️' },
        { id: 'aprobar', label: 'Aprobar Metodología', variant: 'primary', icon: '✓' }
      ],
      'jurado': [
        { id: 'observar', label: 'Objetar', variant: 'outline', icon: '❌' },
        { id: 'aprobar', label: 'Dar Conformidad', variant: 'primary', icon: '✓' }
      ]
    };

    return accionesPersonalizadas || accionesPorTipo[tipoRevisor] || accionesPorTipo['tecnico'];
  };

  // Manejar acciones específicas por tipo de revisor
  const handleAction = async (accion, plan) => {
    try {
      switch (accion) {
        case 'observar':
          await observarPlan(plan.id);
          const accionTexto = tipoRevisor === 'jurado' ? 'objetado' : 'observado';
          console.log(`Plan ${accionTexto} por ${tipoRevisor}:`, plan.tesista);
          break;
        
        case 'aprobar':
          await aprobarPlan(plan.id);
          let aprobacionTexto = 'aprobado';
          if (tipoRevisor === 'tecnico') aprobacionTexto = 'aprobado técnicamente';
          else if (tipoRevisor === 'metodologico') aprobacionTexto = 'aprobado metodológicamente';
          else if (tipoRevisor === 'jurado') aprobacionTexto = 'dado conformidad';
          
          console.log(`Plan ${aprobacionTexto} por ${tipoRevisor}:`, plan.tesista);
          break;
        
        default:
          console.log('Acción no reconocida:', accion);
      }
    } catch (error) {
      console.error(`Error al ejecutar acción como ${tipoRevisor}:`, error);
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
            {titulo}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {tipoRevisor === 'tecnico' && 'Revisa los aspectos técnicos del plan de tesis'}
            {tipoRevisor === 'metodologico' && 'Revisa la metodología propuesta en el plan de tesis'}
            {tipoRevisor === 'jurado' && 'Evalúa el plan de tesis como jurado objetante'}
          </p>
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
          acciones={getAccionesEspecificas()}
          tipoRevisor={tipoRevisor}
        />
      </CardContainer>
    </div>
  );
};

RevisionPlanTesisBase.propTypes = {
  tipoRevisor: PropTypes.oneOf(['tecnico', 'metodologico', 'jurado']).isRequired,
  titulo: PropTypes.string.isRequired,
  accionesPersonalizadas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    variant: PropTypes.string,
    icon: PropTypes.string
  }))
};

export default RevisionPlanTesisBase;
