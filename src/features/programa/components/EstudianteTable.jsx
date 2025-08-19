import React from 'react';
import Estado from '../../../components/Estado';
import { Button } from '../../../components/buttons';
import IconLoading from '../../../components/icons/IconLoading';

/**
 * Tabla reutilizable para mostrar estudiantes
 * Usado en múltiples contextos del rol programa
 */
const EstudianteTable = ({ 
  estudiantes = [], 
  loading = false, 
  onSelectEstudiante, 
  selectedEstudiante,
  showAcciones = true,
  tipo = 'general' 
}) => {
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <IconLoading className="w-6 h-6 text-blue-600" />
          <span className="text-gray-600 dark:text-gray-400">Cargando estudiantes...</span>
        </div>
      </div>
    );
  }

  if (!estudiantes?.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium mb-2">No hay estudiantes disponibles</p>
          <p className="text-sm">En este momento no hay estudiantes que requieran esta acción</p>
        </div>
      </div>
    );
  }

  const getEstadoConfig = (estudiante, tipo) => {
    switch (tipo) {
      case 'designacion-asesor':
        return { estado: 'pendiente', texto: 'Pendiente Asesor' };
      case 'designacion-jurado':
        return { estado: 'pendiente', texto: 'Pendiente Jurado' };
      case 'evaluacion':
        return { estado: estudiante.estado_evaluacion || 'pendiente', texto: estudiante.estado_evaluacion || 'Pendiente' };
      default:
        return { estado: estudiante.estado || 'activo', texto: estudiante.estado || 'Activo' };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Estudiante
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Programa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Título Proyecto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Fecha Registro
            </th>
            {showAcciones && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {estudiantes.map((estudiante) => {
            const { estado, texto } = getEstadoConfig(estudiante, tipo);
            const isSelected = selectedEstudiante?.id === estudiante.id;
            
            return (
              <tr 
                key={estudiante.id} 
                className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          {estudiante.nombres?.charAt(0)}{estudiante.apellidos?.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {estudiante.nombres} {estudiante.apellidos}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {estudiante.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {estudiante.codigo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {estudiante.programa}
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-900 dark:text-white" 
                    title={estudiante.titulo_proyecto}>
                  {estudiante.titulo_proyecto || 'Sin título definido'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Estado estado={estado} texto={texto} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(estudiante.fecha_registro).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                {showAcciones && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      size="sm"
                      variant={isSelected ? 'primary' : 'outline'}
                      onClick={() => onSelectEstudiante(estudiante)}
                    >
                      {isSelected ? 'Seleccionado' : 'Seleccionar'}
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EstudianteTable;
