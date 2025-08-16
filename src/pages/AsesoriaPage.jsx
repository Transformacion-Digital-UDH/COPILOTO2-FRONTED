import React, { useState } from 'react';
import {
  PageContainer,
  DataTableContainer,
  FilterContainer,
  ActionContainer,
  CardContainer
} from '../components/containers';

/**
 * Ejemplo de página de asesoría usando los contenedores
 * Basado en la interfaz mostrada en la imagen
 */
const AsesoriaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Datos de ejemplo
  const tesistas = [
    {
      id: 1,
      name: 'Karol Andréa Peña Ramírez',
      status: 'APROBADO',
      date: '15-07-25',
      revision: 1
    },
    {
      id: 2,
      name: 'Geraldine Brigitte Córdova Aguero',
      status: 'OBSERVADO',
      date: '15-07-25',
      revision: 2
    },
    {
      id: 3,
      name: 'José Santos Chocano',
      status: 'PENDIENTE',
      date: '15-07-25',
      revision: null
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      'APROBADO': 'bg-green-500 text-white',
      'OBSERVADO': 'bg-orange-500 text-white',
      'PENDIENTE': 'bg-gray-500 text-white'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || ''}`}>
        {status}
      </span>
    );
  };

  const handleAction = (action, tesista) => {
    console.log(`${action} para ${tesista.name}`);
  };

  return (
    <PageContainer
      title="Conformidad por el asesor"
      subtitle="Gestión de solicitudes de asesoría académica"
    >
      {/* Sección de Aceptación de Asesoría */}
      <DataTableContainer
        title="Aceptación de Asesoría"
        filters={
          <FilterContainer>
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Filtrar por estado</option>
              <option value="APROBADO">Aprobado</option>
              <option value="OBSERVADO">Observado</option>
              <option value="PENDIENTE">Pendiente</option>
            </select>
          </FilterContainer>
        }
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tesista
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tesis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tesistas.map((tesista) => (
              <tr key={tesista.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(tesista.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                  {tesista.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-blue-600 dark:text-blue-400">📄</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {tesista.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionContainer size="sm">
                    {tesista.status === 'PENDIENTE' ? (
                      <>
                        <button
                          onClick={() => handleAction('rechazar', tesista)}
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        >
                          Rechazar
                        </button>
                        <button
                          onClick={() => handleAction('aprobar', tesista)}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          Aprobar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAction('observar', tesista)}
                          className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                        >
                          Observar
                        </button>
                        <button
                          onClick={() => handleAction('aprobar', tesista)}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                        >
                          Aprobar
                        </button>
                      </>
                    )}
                  </ActionContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableContainer>

      {/* Sección de Revisión */}
      <DataTableContainer
        title="Revisión de Plan de tesis"
        filters={
          <FilterContainer>
            <input
              type="text"
              placeholder="Buscar"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Filtrar por estado</option>
            </select>
          </FilterContainer>
        }
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tesista
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tesis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nro. Revisión
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tesistas.filter(t => t.revision).map((tesista) => (
              <tr key={tesista.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(tesista.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                  {tesista.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-blue-600 dark:text-blue-400">📄</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs rounded-full">
                    {tesista.revision}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {tesista.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionContainer size="sm">
                    <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors">
                      Observar
                    </button>
                    <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
                      Aprobar
                    </button>
                  </ActionContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableContainer>
    </PageContainer>
  );
};

export default AsesoriaPage;
