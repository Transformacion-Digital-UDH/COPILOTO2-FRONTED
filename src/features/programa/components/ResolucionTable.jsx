import React from 'react';
import { DataTableContainer, FilterContainer } from '../../../components/containers';
import FormField from '../../../components/FormField';
import Estado from '../../../components/Estado';
import Button from '../../../components/Button';
import ButtonRevision from '../../../components/ButtonRevision';

/**
 * Tabla reutilizable para la solicitud de resolución de aprobación de plan de tesis
 * Sigue el mismo patrón que DesignacionTable y JuradoTable
 */
const ResolucionTable = ({ 
  data = [], 
  onAction, 
  loading = false,
  busqueda = '',
  setBusqueda,
  filtroEstado = '',
  setFiltroEstado,
  resetFiltros
}) => {
  const getBotonesAccion = (estudiante) => {
    switch (estudiante.estado) {
      case 'aprobado':
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="danger"
              size="sm"
              onClick={() => onAction('rechazar', estudiante)}
            >
              Rechazar
            </Button>
            <ButtonRevision
              size="sm"
              onClick={() => onAction('solicitar', estudiante)}
            >
              Solicitar
            </ButtonRevision>
          </div>
        );
      case 'observado':
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="danger"
              size="sm"
              onClick={() => onAction('rechazar', estudiante)}
            >
              Rechazar
            </Button>
            <Button
              variant="approve"
              size="sm"
              onClick={() => onAction('aprobar', estudiante)}
            >
              Aprobar
            </Button>
          </div>
        );
      case 'pendiente':
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="danger"
              size="sm"
              onClick={() => onAction('rechazar', estudiante)}
            >
              Rechazar
            </Button>
            <Button
              variant="approve"
              size="sm"
              onClick={() => onAction('aprobar', estudiante)}
            >
              Aprobar
            </Button>
          </div>
        );
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  return (
    <DataTableContainer
      filters={
        <FilterContainer onReset={resetFiltros}>
          <FormField
            type="text"
            placeholder="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-64"
          />
          <FormField
            type="select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-48"
          >
            <option value="">Filtrar por estado</option>
            <option value="pendiente">Pendiente</option>
            <option value="observado">Observado</option>
            <option value="aprobado">Aprobado</option>
          </FormField>
        </FilterContainer>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tesista
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Asesores
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-56">
                Jurado objetante
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Cargando...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No se encontraron estudiantes con los filtros aplicados
                </td>
              </tr>
            ) : (
              data.map((estudiante) => (
                <tr 
                  key={estudiante.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Estado estado={estudiante.estado} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {estudiante.tesista}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="space-y-1">
                      <div><span className="font-medium">A.T:</span> {estudiante.asesor_tecnico}</div>
                      <div><span className="font-medium">A.M:</span> {estudiante.asesor_metodologico}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {estudiante.jurado_objetante}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {getBotonesAccion(estudiante)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DataTableContainer>
  );
};

export default ResolucionTable;
