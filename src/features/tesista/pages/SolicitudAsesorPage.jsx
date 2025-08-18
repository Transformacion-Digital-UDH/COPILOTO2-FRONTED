import React from 'react';
import { CardContainer } from '../../../components/containers';
import SolicitudAsesorForm from '../components/SolicitudAsesorForm';
import AprobacionPlanForm from '../components/AprobacionPlanForm';

/**
 * Página para solicitar asesor técnico y ver aprobación del plan - Tesista
 * Replica exactamente la imagen proporcionada con componentes separados
 */
const SolicitudAsesorPage = () => {
  const handleFormSubmit = (formData) => {
    console.log('Formulario enviado:', formData);
    // Aquí puedes agregar lógica para redirigir o mostrar mensaje de éxito
    alert('¡Solicitud enviada correctamente!');
  };

  const handleFormCancel = () => {
    console.log('Formulario cancelado');
    // Aquí puedes agregar lógica para redirigir de vuelta
  };

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
    </div>
  );
};

export default SolicitudAsesorPage;
