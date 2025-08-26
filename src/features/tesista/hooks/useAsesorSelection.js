import { useState, useEffect } from 'react';
import { lineasInvestigacionService } from '../../../services/lineasInvestigacionService';

/**
 * Hook para manejar la selección de asesor técnico
 */
export const useAsesorSelection = () => {
  const [asesores, setAsesores] = useState([]);
  const [lineasInvestigacion, setLineasInvestigacion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Datos mock de respaldo para desarrollo
  const mockAsesores = [
    { value: 'asesor1', label: 'Dr. Carlos Mendoza Vega' },
    { value: 'asesor2', label: 'Dra. María Elena Rodríguez' },
    { value: 'asesor3', label: 'Dr. José Antonio Silva' },
    { value: 'asesor4', label: 'Dra. Ana Patricia Torres' }
  ];

  const mockLineas = [
    { value: 'sistemas', label: 'Sistemas de Información' },
    { value: 'ia', label: 'Inteligencia Artificial' },
    { value: 'redes', label: 'Redes y Comunicaciones' },
    { value: 'software', label: 'Ingeniería de Software' },
    { value: 'seguridad', label: 'Seguridad Informática' }
  ];

  /**
   * 🎯 Cargar líneas de investigación del programa del estudiante (con JWT)
   */
  const cargarLineasInvestigacion = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await lineasInvestigacionService.getLineasPorPrograma();

      if (result.success && result.data) {
        // Verificar si tenemos un array
        const datosLineas = Array.isArray(result.data) ? result.data : 
                           Array.isArray(result.data.lineas) ? result.data.lineas :
                           [];

        if (datosLineas.length > 0) {
          // ✅ API funcionó - formatear datos para el select
          const lineasFormateadas = datosLineas.map((linea, index) => {
            // Intentar múltiples campos posibles para el nombre
            const posiblesNombres = [
              linea.li_nombre,        // ✅ Campo real encontrado en la API
              linea.nombre,
              linea.descripcion,
              linea.title,
              linea.name,
              linea.linea_nombre,
              linea.nombreLinea,
              linea.descripcion_linea,
              linea.linea_descripcion
            ];
            
            const nombreEncontrado = posiblesNombres.find(nombre => nombre && typeof nombre === 'string' && nombre.trim()) || `Línea ${index + 1}`;
            
            return {
              value: (linea.id || linea.codigo || index).toString(),
              label: nombreEncontrado,
              descripcion: linea.descripcion || '',
              codigo: linea.codigo || ''
            };
          });

          setLineasInvestigacion(lineasFormateadas);
          setError(null);
        } else {
          setLineasInvestigacion(mockLineas);
          setError('No hay líneas disponibles - Usando datos de prueba');
        }
      } else {
        // ⚠️ API no devolvió datos - usar mock
        setLineasInvestigacion(mockLineas);
        setError(`Error en la API - Usando datos de prueba`);
      }
    } catch (error) {
      // ❌ Error en la API - usar mock como fallback
      setLineasInvestigacion(mockLineas);
      setError(`Error: ${error.message} - Usando datos de prueba`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🎯 Cargar asesores disponibles
   */
  const cargarAsesores = async () => {
    try {
      const result = await lineasInvestigacionService.getAllAsesores();

      if (result.success && result.data?.length > 0) {
        // ✅ API funcionó - formatear datos
        const asesoresFormateados = result.data.map((asesor, index) => {
          // Construir nombre completo con múltiples opciones
          const grado = asesor.grado || asesor.titulo || 'Dr.';
          const nombres = asesor.nombres || asesor.nombre || asesor.first_name || '';
          const apellidos = asesor.apellidos || asesor.apellido || asesor.last_name || '';
          
          const nombreCompleto = `${grado} ${nombres} ${apellidos}`.trim();
          
          return {
            value: (asesor.id || index).toString(),
            label: nombreCompleto,
            especialidad: asesor.especialidad || '',
            email: asesor.email || asesor.correo || ''
          };
        });

        setAsesores(asesoresFormateados);
      } else {
        // ⚠️ Usar mock como fallback
        setAsesores(mockAsesores);
      }
    } catch (error) {
      // ❌ Error - usar mock
      setAsesores(mockAsesores);
    }
  };

  /**
   * 🎯 Cargar asesores por línea de investigación específica
   * @param {string} lineaId - ID de la línea de investigación
   */
  const cargarAsesoresPorLinea = async (lineaId) => {
    if (!lineaId) {
      await cargarAsesores();
      return;
    }

    setLoading(true);
    try {
      const result = await lineasInvestigacionService.getAsesoresPorLinea(lineaId);

      if (result.success && result.data?.length > 0) {
        const asesoresFormateados = result.data.map(asesor => ({
          value: asesor.id?.toString(),
          label: `${asesor.grado || 'Dr.'} ${asesor.nombres || asesor.nombre} ${asesor.apellidos || asesor.apellido || ''}`.trim(),
          especialidad: asesor.especialidad || '',
          email: asesor.email || asesor.correo || ''
        }));

        setAsesores(asesoresFormateados);
      } else {
        // Si no hay asesores específicos, cargar todos
        await cargarAsesores();
      }
    } catch (error) {
      await cargarAsesores(); // Fallback a todos los asesores
    } finally {
      setLoading(false);
    }
  };

  /**
   * 📤 Enviar solicitud de asesor técnico (con JWT)
   */
  const submitSolicitud = async (formData) => {
    setLoading(true);

    try {
      const result = await lineasInvestigacionService.enviarSolicitudAsesor(formData);

      if (result.success) {
        return {
          success: true,
          data: result.data,
          message: result.message || 'Solicitud enviada correctamente'
        };
      } else {
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión al enviar la solicitud'
      };
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Cargar datos al montar el componente
  useEffect(() => {
    // También cargar desde API
    cargarLineasInvestigacion();
    cargarAsesores();
  }, []);

  return {
    // Datos
    asesores,
    lineasInvestigacion,
    loading,
    error,
    
    // Funciones
    submitSolicitud,
    cargarAsesoresPorLinea,
    recargarLineas: cargarLineasInvestigacion,
    recargarAsesores: cargarAsesores
  };
};
