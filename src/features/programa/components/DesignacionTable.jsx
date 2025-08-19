import React from 'react';
import { DataTableContainer } from '../../../components/containers';
import Estado from '../../../components/Estado';
import Button from '../../../components/Button';
import ButtonRevision from '../../../components/ButtonRevision';

/**
 * Componente de tabla reutilizable para mostrar designaciones de asesores
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la tabla
 * @param {Array} props.data - Array de datos para la tabla
 * @param {Function} props.onAction - Función para manejar acciones
 * @param {boolean} props.loading - Estado de carga
 * @param {string} props.className - Clases CSS adicionales
 */
const DesignacionTable = ({ 
  title, 
  data = [], 
  onAction, 
  loading = false,
  className = '' 
}) => {

  const getBotonesAccion = (estudiante) => {
    switch (estudiante.estado) {
      case 'aprobado':
        return (
          <div className="flex justify-center gap-2">
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => onAction && onAction('rechazar', estudiante)}
            >
              Rechazar
            </Button>
            <ButtonRevision 
              variant="secondary"
              onClick={() => onAction && onAction('solicitar', estudiante)}
            />
          </div>
        );
      case 'observado':
        return (
          <div className="flex justify-center gap-2">
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => onAction && onAction('rechazar', estudiante)}
            >
              Rechazar
            </Button>
            <Button 
              variant="success" 
              size="sm"
              onClick={() => onAction && onAction('aprobar', estudiante)}
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
              onClick={() => onAction && onAction('rechazar', estudiante)}
            >
              Rechazar
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onAction && onAction('aprobar', estudiante)}
            >
              Aprobar
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DataTableContainer title={title} className={className}>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-20">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-64">
              Tesista
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-48">
              A. Técnico
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-56">
              A. Metodológico
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-48">
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
                  {estudiante.asesor_tecnico || (
                    <select className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 w-full">
                      <option value="">Seleccionar...</option>
                    </select>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {estudiante.asesor_metodologico || (
                    <select className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 w-full">
                      <option value="">Seleccionar...</option>
                    </select>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {getBotonesAccion(estudiante)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </DataTableContainer>
  );
};

export default DesignacionTable;
