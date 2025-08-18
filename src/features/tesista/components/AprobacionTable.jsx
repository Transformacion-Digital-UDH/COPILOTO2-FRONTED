import React from 'react';
import { DataTableContainer } from '../../../components/containers';
import Estado from '../../../components/Estado';
import ButtonRevision from '../../../components/ButtonRevision';

/**
 * Componente de tabla reutilizable para mostrar aprobaciones
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la tabla
 * @param {Array} props.data - Array de datos para la tabla
 * @param {Function} props.onAction - Función para manejar acciones
 * @param {string} props.className - Clases CSS adicionales
 */
const AprobacionTable = ({ 
  title, 
  data = [], 
  onAction, 
  className = '' 
}) => {

  const getButtonVariant = (estado) => {
    if (estado === 'pendiente' && estado !== 'aprobado') {
      return 'secondary';
    }
    return 'primary';
  };

  return (
    <DataTableContainer title={title} className={className}>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Tipo de Jurado
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Apellidos y nombres
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Nro. Revisión
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Fecha de envío
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-4 whitespace-nowrap">
                  <Estado estado={item.estado} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {item.tipo}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {item.nombre}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs rounded-full">
                    {item.revision}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.fechaEnvio}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <ButtonRevision
                    onClick={() => onAction && onAction(item)}
                    variant={getButtonVariant(item.estado)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DataTableContainer>
  );
};

export default AprobacionTable;
