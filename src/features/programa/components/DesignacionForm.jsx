import React, { useState } from 'react';
import { AcceptButton, CancelButton } from '../../../components/buttons';
import FormField from '../../../components/FormField';

/**
 * Formulario reutilizable para designaciones
 * Usado para asignar asesores y jurados
 */
const DesignacionForm = ({ 
  estudiante, 
  asesores = [], 
  jurados = [], 
  onDesignar, 
  loading = false, 
  tipo = 'asesor' 
}) => {
  const [formData, setFormData] = useState({
    selectedId: '',
    observaciones: ''
  });

  const personas = tipo === 'asesor' ? asesores : jurados;
  const titulo = tipo === 'asesor' ? 'Asesor' : 'Jurado';
  const fieldLabel = tipo === 'asesor' ? 'Seleccionar Asesor' : 'Seleccionar Jurado';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.selectedId) return;
    
    onDesignar(estudiante.id, formData.selectedId, formData.observaciones);
  };

  const handleCancel = () => {
    setFormData({ selectedId: '', observaciones: '' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Información del estudiante */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          Designar {titulo}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800 dark:text-blue-200">Estudiante:</span>
            <p className="text-blue-700 dark:text-blue-300">
              {estudiante.nombres} {estudiante.apellidos}
            </p>
          </div>
          <div>
            <span className="font-medium text-blue-800 dark:text-blue-200">Código:</span>
            <p className="text-blue-700 dark:text-blue-300">{estudiante.codigo}</p>
          </div>
          <div className="md:col-span-2">
            <span className="font-medium text-blue-800 dark:text-blue-200">Proyecto:</span>
            <p className="text-blue-700 dark:text-blue-300">
              {estudiante.titulo_proyecto || 'Sin título definido'}
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selección de persona */}
        <FormField
          label={fieldLabel}
          name="selectedId"
          type="select"
          value={formData.selectedId}
          onChange={(e) => setFormData({ ...formData, selectedId: e.target.value })}
          required
          options={[
            { value: '', label: `Seleccione un ${tipo}...` },
            ...personas.map(persona => ({
              value: persona.id,
              label: `${persona.nombres} ${persona.apellidos} - ${persona.especialidad || persona.area}`
            }))
          ]}
        />

        {/* Información del seleccionado */}
        {formData.selectedId && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {(() => {
              const selected = personas.find(p => p.id === formData.selectedId);
              return selected ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                    <p className="text-gray-600 dark:text-gray-400">{selected.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {tipo === 'asesor' ? 'Especialidad:' : 'Área:'}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selected.especialidad || selected.area}
                    </p>
                  </div>
                  {selected.telefono && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Teléfono:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selected.telefono}</p>
                    </div>
                  )}
                  {selected.experiencia && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Experiencia:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selected.experiencia} años</p>
                    </div>
                  )}
                </div>
              ) : null;
            })()}
          </div>
        )}

        {/* Observaciones */}
        <FormField
          label="Observaciones"
          name="observaciones"
          type="textarea"
          value={formData.observaciones}
          onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
          placeholder={`Ingrese observaciones para la designación del ${tipo}...`}
          rows={3}
        />

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <CancelButton onClick={handleCancel} disabled={loading}>
            Cancelar
          </CancelButton>
          <AcceptButton 
            type="submit" 
            loading={loading}
            disabled={!formData.selectedId}
          >
            Designar {titulo}
          </AcceptButton>
        </div>
      </form>
    </div>
  );
};

export default DesignacionForm;
