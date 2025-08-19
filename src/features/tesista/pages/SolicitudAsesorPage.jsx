import React from 'react';
import { CardContainer } from '../../../components/containers';
import SolicitudAsesorForm from '../components/SolicitudAsesorForm';
import AprobacionPlanForm from '../components/AprobacionPlanForm';
import InicioDeTramite from '../components/InicioDeTramite';
import { useThemeStore } from '../../../hooks/useThemeStore';
import { useTramiteState } from '../hooks/useTramiteState';

/**
 * Página para solicitar asesor técnico y ver aprobación del plan - Tesista
 * Muestra primero InicioDeTramite y luego los formularios
 */
const SolicitudAsesorPage = () => {
  // Hook de tema para detectar modo oscuro
  const { isDark } = useThemeStore();
  
  // Hook para manejar estado del trámite
  const { tramiteIniciado, loading, iniciarTramite, resetearTramite } = useTramiteState();
  const handleFormSubmit = (formData) => {
    console.log('Formulario enviado:', formData);
    // Aquí puedes agregar lógica para redirigir o mostrar mensaje de éxito
    alert('¡Solicitud enviada correctamente!');
  };

  const handleFormCancel = () => {
    console.log('Formulario cancelado');
    // Aquí puedes agregar lógica para redirigir de vuelta
  };

  // Mostrar loading mientras se carga el estado
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando...</span>
      </div>
    );
  }

  // Si el trámite no ha sido iniciado, mostrar InicioDeTramite
  if (!tramiteIniciado) {
    return (
      <InicioDeTramite 
        onStartProcess={iniciarTramite}
        title="TRÁMITE DE LA TITULACIÓN"
        description="Este es el inicio para el proceso de trámite de titulación, por favor dale clic en Iniciar trámite para empezar con el trámite de la designación de tu asesor"
        buttonText="Iniciar trámite"
        isDarkMode={isDark}
      />
    );
  }

  // Una vez iniciado el trámite, mostrar los formularios
  return (
    <div className="w-full min-h-full space-y-8 p-6">
      {/* Primera sección - Formulario de solicitud */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            1/2. Solicitar Asesor Técnico
          </h1>
        </div>
        
        <SolicitudAsesorForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </CardContainer>

      {/* Segunda sección - Aprobación de Plan de tesis */}
      <CardContainer className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            2/2. Aprobación de Plan de tesis
          </h1>
          
          <AprobacionPlanForm />
        </div>
      </CardContainer>

      {/* Botón de desarrollo - Solo para testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={resetearTramite}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg shadow-lg transition-colors"
            title="Reset trámite (solo desarrollo)"
          >
            🔄 Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default SolicitudAsesorPage;
