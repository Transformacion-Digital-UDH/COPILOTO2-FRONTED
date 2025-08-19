import React, { useState } from 'react';
import { CardContainer } from '../../../components/containers';
import JuradoTable from '../components/JuradoTable';
import { useJurados } from '../hooks/useJurados';

/**
 * Página para designar jurados objetantes a estudiantes - Programa Académico
 * Replica el diseño mostrado en la imagen de referencia y sigue el mismo patrón que DesignarAsesorPage
 */
const DesignarJuradoPage = () => {
  const { 
    estudiantes, 
    jurados, 
    loading, 
    designarJurado,
    aprobarJurado,
    rechazarJurado,
    solicitarRevision
  } = useJurados();

  // Estados locales para filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Datos mock que coinciden con la imagen
  const estudiantesMock = [
    {
      id: 1,
      estado: 'aprobado',
      tesista: 'Karol Andrea Peña Ramírez',
      asesor_tecnico: 'Cristiam Lopez',
      asesor_metodologico: 'Jenny Reynoso',
      jurado_objetante: null
    },
    {
      id: 2,
      estado: 'observado',
      tesista: 'Geraldine Córdova Agüero',
      asesor_tecnico: 'Julio Trigos',
      asesor_metodologico: 'Rosa Castro',
      jurado_objetante: null
    },
    {
      id: 3,
      estado: 'pendiente',
      tesista: 'José Santos Chocano',
      asesor_tecnico: 'Julio Sanguineti',
      asesor_metodologico: 'Jenny Reynoso',
      jurado_objetante: null
    }
  ];

  const juradosMock = [
    { id: 1, nombre: 'Dr. Carlos Mendoza Silva' },
    { id: 2, nombre: 'Dra. María González López' },
    { id: 3, nombre: 'Mg. Roberto Vásquez Torres' },
    { id: 4, nombre: 'Dr. Ana Lucía Fernández' },
    { id: 5, nombre: 'Mg. José Miguel Herrera' },
    { id: 6, nombre: 'Dra. Patricia Morales Cruz' }
  ];

  // Usar datos mock si no hay datos del hook
  const estudiantesData = estudiantes.length > 0 ? estudiantes : estudiantesMock;
  const juradosData = jurados.length > 0 ? jurados : juradosMock;

  // Filtrar estudiantes según búsqueda y estado
  const estudiantesFiltrados = estudiantesData.filter(estudiante => {
    const matchBusqueda = !busqueda || 
      estudiante.tesista.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.asesor_tecnico?.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.asesor_metodologico?.toLowerCase().includes(busqueda.toLowerCase());
    
    const matchEstado = !filtroEstado || estudiante.estado === filtroEstado;
    
    return matchBusqueda && matchEstado;
  });

  const handleAction = async (accion, estudiante, valor = null) => {
    try {
      switch (accion) {
        case 'aprobar':
          await aprobarJurado(estudiante.id);
          console.log('Jurado aprobado para estudiante:', estudiante.tesista);
          break;
        
        case 'rechazar':
          await rechazarJurado(estudiante.id, 'Rechazado desde la interfaz');
          console.log('Jurado rechazado para estudiante:', estudiante.tesista);
          break;
        
        case 'solicitar':
          await solicitarRevision(estudiante.id, 'Solicitud de revisión desde la interfaz');
          console.log('Revisión solicitada para estudiante:', estudiante.tesista);
          break;
        
        case 'asignar_jurado':
          if (valor) {
            await designarJurado(estudiante.id, valor, 'Designación desde la interfaz');
            console.log('Jurado asignado:', valor, 'a estudiante:', estudiante.tesista);
          }
          break;
        
        default:
          console.log('Acción no reconocida:', accion);
      }
    } catch (error) {
      console.error('Error al ejecutar acción:', error);
      // Aquí podrías mostrar una notificación de error
    }
  };

  const resetFiltros = () => {
    setBusqueda('');
    setFiltroEstado('');
  };

  return (
    <div className="w-full min-h-full space-y-8 p-6">
      {/* Tabla de designación de jurados objetantes */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Designación de Jurado objetante
          </h1>
        </div>
        
        <JuradoTable
          data={estudiantesFiltrados}
          onAction={handleAction}
          loading={loading}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          resetFiltros={resetFiltros}
          jurados={juradosData}
        />
      </CardContainer>
    </div>
  );
};

export default DesignarJuradoPage;
