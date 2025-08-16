import React from 'react';
import { CardContainer } from '../../../components/containers';
import SolicitudAsesorForm from '../components/SolicitudAsesorForm';

/**
 * Página para solicitar asesor técnico - Tesista
 * Replica exactamente la imagen proporcionada
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
    <div className="w-full h-full flex items-center justify-center">
      <CardContainer className="w-full">
        {/* Título dentro del contenedor */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            1/2. Solicitar Asesor Técnico
          </h1>
        </div>
        
        <SolicitudAsesorForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </CardContainer>
    </div>
  );
};

export default SolicitudAsesorPage;
