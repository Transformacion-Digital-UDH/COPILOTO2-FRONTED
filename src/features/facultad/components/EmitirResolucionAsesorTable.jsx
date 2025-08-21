import { DataTableContainer, FilterContainer } from '../../../components/containers';
import FormField from '../../../components/FormField';
import Estado from '../../../components/Estado';
import Button from '../../../components/Button';

/**
 * Tabla para emitir resolución de designación de asesores
 * Sigue el mismo patrón que AsesoriaTable y RevisionPlanTesisTable
 */
const EmitirResolucionAsesorTable = ({ 
  data = [],
  onAction,
  loading = false,
  busqueda, 
  setBusqueda, 
  filtroEstado, 
  setFiltroEstado, 
  resetFiltros 
}) => {
  // Función para obtener los botones de acción según el estado
  const getBotonesAccion = (resolucion) => {
    switch (resolucion.estado.toLowerCase()) {
      case 'aprobado':
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAction('rechazar', resolucion)}
            >
              Rechazar
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAction('solicitar', resolucion)}
            >
              Solicitar
            </Button>
          </div>
        );
      case 'observado':
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAction('rechazar', resolucion)}
            >
              Rechazar
            </Button>
            <Button
              variant="approve"
              size="sm"
              onClick={() => onAction('aprobar', resolucion)}
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
              onClick={() => onAction('rechazar', resolucion)}
            >
              Rechazar
            </Button>
            <Button
              variant="approve"
              size="sm"
              onClick={() => onAction('aprobar', resolucion)}
            >
              Aprobar
            </Button>
          </div>
        );
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  const columnas = [
    { nombre: 'Estado', alineacion: 'text-left' },
    { nombre: 'Tesista', alineacion: 'text-left' }, 
    { nombre: 'A. Técnico', alineacion: 'text-left' },
    { nombre: 'A. Metodológico', alineacion: 'text-left' },
    { nombre: 'Acción', alineacion: 'text-center' }
  ];

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
            <option value="APROBADO">Aprobado</option>
            <option value="OBSERVADO">Observado</option>
            <option value="PENDIENTE">Pendiente</option>
          </FormField>
        </FilterContainer>
      }
    >
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500 dark:text-gray-400">
            Cargando resoluciones...
          </div>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columnas.map((columna, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 ${columna.alineacion} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}
                >
                  {columna.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columnas.length}
                  className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No se encontraron resoluciones para emitir
                </td>
              </tr>
            ) : (
              data.map((resolucion) => (
                <tr 
                  key={resolucion.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Estado estado={resolucion.estado} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {resolucion.tesista}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {resolucion.asesorTecnico}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {resolucion.asesorMetodologico}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {getBotonesAccion(resolucion)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </DataTableContainer>
  );
};

export default EmitirResolucionAsesorTable;
