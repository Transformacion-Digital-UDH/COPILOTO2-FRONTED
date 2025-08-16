import React from 'react';

/**
 * Componente de campo de formulario reutilizable
 * 
 * @param {Object} props
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.type - Tipo de campo ('text', 'select', 'textarea', 'email', etc.)
 * @param {string} props.placeholder - Placeholder del campo
 * @param {*} props.value - Valor actual del campo
 * @param {Function} props.onChange - Función para manejar cambios
 * @param {Array} props.options - Opciones para select (array de objetos {value, label})
 * @param {boolean} props.required - Campo obligatorio
 * @param {boolean} props.disabled - Campo deshabilitado
 * @param {string} props.error - Mensaje de error
 * @param {string} props.className - Clases CSS adicionales
 * @param {Object} props.inputProps - Props adicionales para el input
 */
const FormField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error,
  className = '',
  ...inputProps
}) => {
  const baseInputClasses = `
    w-full px-4 py-3 rounded-lg border transition-all duration-200
    bg-gray-100 dark:bg-gray-700 
    border-gray-300 dark:border-gray-600
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
  `;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={baseInputClasses}
            {...inputProps}
          >
            <option value="">{placeholder || 'Seleccionar...'}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={4}
            className={baseInputClasses}
            {...inputProps}
          />
        );

      default:
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={baseInputClasses}
            {...inputProps}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
