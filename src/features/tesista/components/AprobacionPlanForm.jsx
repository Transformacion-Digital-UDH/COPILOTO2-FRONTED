import React from 'react';
import { useAprobacionPlan } from '../hooks/useAprobacionPlan';
import AprobacionTable from './AprobacionTable';

/**
 * Componente para mostrar las tablas de aprobación del plan de tesis
 */
const AprobacionPlanForm = () => {
  const { aprobacionData, loading, solicitarRevision } = useAprobacionPlan();

  const handleSolicitarRevision = async (item) => {
    const result = await solicitarRevision(item);
    if (result.success) {
      alert(result.message);
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Cargando datos de aprobación...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Sección A: Aprobación por los Asesores */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          A. Aprobación por los Asesores
        </h2>
        <AprobacionTable
          data={aprobacionData.asesores}
          onAction={handleSolicitarRevision}
        />
      </div>

      {/* Sección B: Aprobación por el Jurado */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          B. Aprobación por el Jurado
        </h2>
        <AprobacionTable
          data={aprobacionData.jurados}
          onAction={handleSolicitarRevision}
        />
      </div>
    </div>
  );
};

export default AprobacionPlanForm;
