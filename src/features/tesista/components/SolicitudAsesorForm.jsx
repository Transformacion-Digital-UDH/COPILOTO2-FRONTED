import React, { useState } from 'react';
import { ActionContainer } from '../../../components/containers';
import FormField from '../../../components/FormField';
import { useAsesorSelection } from '../hooks/useAsesorSelection';
import ConfirmModal from '../../../components/ConfirmModal.jsx';
import AcceptButton from '../../../components/AcceptButton.jsx';
import CancelButton from '../../../components/CancelButton.jsx';

/**
 * Formulario para solicitar asesor técnico
 */
const SolicitudAsesorForm = ({ onCancel, onSubmit }) => {
  const { 
    asesores, 
    lineasInvestigacion, 
    programa,
    loading, 
    errorLineas,
    hasLineas,
    isReady,
    submitSolicitud,
    refetchLineas
  } = useAsesorSelection();
  
  const [formData, setFormData] = useState({
    tituloTesis: '',
    asesorTecnico: '',
    lineaInvestigacion: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tituloTesis.trim()) {
      newErrors.tituloTesis = 'El título de la tesis es obligatorio';
    }

    if (!formData.asesorTecnico) {
      newErrors.asesorTecnico = 'Debe seleccionar un asesor técnico';
    }

    if (!formData.lineaInvestigacion) {
      newErrors.lineaInvestigacion = 'Debe seleccionar una línea de investigación';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    
    try {
      const result = await submitSolicitud(formData);
      if (result.success) {
        onSubmit && onSubmit(formData);
        // Resetear formulario
        setFormData({
          tituloTesis: '',
          asesorTecnico: '',
          lineaInvestigacion: ''
        });
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      tituloTesis: '',
      asesorTecnico: '',
      lineaInvestigacion: ''
    });
    setErrors({});
    onCancel && onCancel();
  };

  return (
    <div className="space-y-6">
      {/* Error de líneas de investigación */}
      {errorLineas && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                Error al cargar líneas de investigación
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm">
                {errorLineas}
              </p>
            </div>
            <button
              onClick={refetchLineas}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 text-sm underline"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      <FormField
        label="Título de la tesis"
        type="text"
        value={formData.tituloTesis}
        onChange={(e) => handleInputChange('tituloTesis', e.target.value)}
        placeholder="Ingrese el título de su tesis..."
        required
        error={errors.tituloTesis}
        disabled={loading}
      />

      <FormField
        label="Asesor técnico"
        type="select"
        value={formData.asesorTecnico}
        onChange={(e) => handleInputChange('asesorTecnico', e.target.value)}
        options={asesores}
        placeholder="Seleccione un asesor técnico..."
        required
        error={errors.asesorTecnico}
        disabled={loading}
      />

      <FormField
        label="Línea de investigación"
        type="select"
        value={formData.lineaInvestigacion}
        onChange={(e) => handleInputChange('lineaInvestigacion', e.target.value)}
        options={lineasInvestigacion}
        placeholder={
          loading 
            ? "Cargando líneas de investigación..." 
            : hasLineas 
              ? "Seleccione una línea de investigación..."
              : "No hay líneas disponibles"
        }
        required
        error={errors.lineaInvestigacion}
        disabled={loading || !hasLineas}
        helperText={
          !hasLineas && !loading && !errorLineas 
            ? "No se encontraron líneas de investigación para su programa"
            : undefined
        }
      />

      <ActionContainer align="right" className="pt-4">
        <CancelButton 
          onClick={handleCancel}
          disabled={isSubmitting}
        />
        
        <AcceptButton
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={loading || !isReady}
          loadingText="Enviando..."
        />
      </ActionContainer>

      {/* Modal de confirmación */}
      <ConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirmar solicitud"
        message={`¿Está seguro de enviar la solicitud de tesis "${formData.tituloTesis}"?`}
        confirmText="Enviar solicitud"
        cancelText="Cancelar"
        variant="info"
        loading={false}
      />
    </div>
  );
};

export default SolicitudAsesorForm;
