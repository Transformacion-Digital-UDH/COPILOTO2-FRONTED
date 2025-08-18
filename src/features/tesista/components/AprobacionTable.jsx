import React from 'react';
import { DataTableContainer } from '../../../components/containers';

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
  
  const getEstadoBadge = (estado) => {
    const estilos = {
      'APROBADO': 'bg-green-600 text-white px-3 py-1 rounded-full text-xs',
      'PENDIENTE': 'bg-orange-500 text-white px-3 py-1 rounded-full text-xs',
      'NO INICIADO': 'bg-gray-500 text-white px-3 py-1 rounded-full text-xs'
    };
    
    return (
      <span className={estilos[estado] || 'bg-gray-500 text-white px-3 py-1 rounded-full text-xs'}>
        {estado}
      </span>
    );
  };

  const getActionButtonStyle = (estado) => {
    if (estado === 'NO INICIADO') {
      return 'bg-gray-500 hover:bg-gray-600';
    }
    return 'bg-blue-600 hover:bg-blue-700';
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
                  {getEstadoBadge(item.estado)}
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
                  <button
                    onClick={() => onAction && onAction(item)}
                    className={`${getActionButtonStyle(item.estado)} text-white px-4 py-2 rounded text-sm font-medium transition-colors`}
                  >
                    Solicitar revisión
                  </button>
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
