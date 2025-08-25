import React, { useState } from 'react';
import { IconEyeIsPassword, IconEyePassword, IconLoading } from '../../../components/icons';
import { useRegister } from '../hooks/useRegister';

const RegisterForm = ({ onSwitchToLogin }) => {
  // Estados del formulario
  const [formData, setFormData] = useState({
    code: '',
    dni: '',
    acceptTerms: false
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Hook de registro
  const { loading, error, registerStudent, clearError } = useRegister();

  // Validaciones
  const validateNumber = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const validateDNI = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  // Manejo de cambios en inputs
  const handleInputChange = (field, value) => {
    let processedValue = value;
    
    if (field === 'code') {
      processedValue = validateNumber(value);
    } else if (field === 'dni') {
      processedValue = validateDNI(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));

    // Limpiar error si el usuario está escribiendo
    if (error) {
      clearError();
    }
  };

  // Función de alerta simple (reemplazar con tu sistema de alertas)
  const showAlert = (message) => {
    alert(message); // TODO: Reemplazar con tu componente Alert
  };

  // Manejo del registro
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      showAlert("Acepta los términos y condiciones para registrarte.");
      return;
    }

    if (!/^\d{10}$/.test(formData.code)) {
      showAlert("El código institucional debe tener 10 dígitos.");
      return;
    }

    if (!/^\d{8}$/.test(formData.dni)) {
      showAlert("El DNI debe tener 8 dígitos numéricos.");
      return;
    }

    try {
      const response = await registerStudent({
        code: formData.code,
        dni: formData.dni
      });
      
      showAlert("¡Registro exitoso! " + (response.message || "Bienvenido al sistema"));
      
      // Si hay auto-login (viene con token), redirigir al dashboard
      if (response.token) {
        window.location.href = '/dashboard';
      } else {
        // Si no hay auto-login, ir al formulario de login
        onSwitchToLogin();
      }
      
    } catch (error) {
      showAlert(error.message || "Error en el registro. Intenta nuevamente.");
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg px-8 py-6 self-center mx-auto shadow-lg dark:bg-gray-800/95">
      <div className="text-center mb-5">
        <h6 className="text-2xl text-azul dark:text-gray-300 mb-4 tracking-wide">
          Regístrate
        </h6>
        <p className="text-base text-gray-600 dark:text-gray-300 tracking-wide">
          ¿Ya tienes una cuenta?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-base hover:underline tracking-wide text-azul dark:text-blue-400"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>

      {/* TODO: Agregar GoogleLoginButton cuando esté disponible para registro */}

      {/* Formulario de registro */}
      <form onSubmit={handleRegister}>
        {/* CAMPO PARA INGRESAR CODIGO */}
        <div className="mb-4 relative">
          <label 
            className="block text-sm text-gray-700 dark:text-gray-300 mb-1" 
            htmlFor="code"
          >
            Código (10 dígitos)
          </label>
          <input 
            type="text" 
            id="code" 
            placeholder="Código institucional"
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            className="w-full px-4 py-2 pr-28 border border-gray-300 dark:border-gray-300/60 rounded-lg focus:outline-none focus:ring-0 focus:border-2 focus:border-base focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300"
            required
            maxLength="10"
            pattern="\d{10}"
            inputMode="numeric"
            autoFocus 
          />
          
          <div className="absolute inset-y-11 right-3 flex items-center text-gray-700 dark:text-gray-300 pointer-events-none">
            @udh.edu.pe
          </div>
        </div>

        {/* CAMPO PARA INGRESAR DNI */}
        <div className="relative mb-4">
          <div 
            className="absolute inset-y-11 right-3 flex items-center ps-3 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <IconEyeIsPassword className="text-gray-700 dark:text-gray-300 w-5" />
            ) : (
              <IconEyePassword className="text-gray-700 dark:text-gray-300 w-5" />
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <label
              className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="dni"
            >
              DNI
            </label>
          </div>
          
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="dni"
            placeholder="Ingrese número DNI"
            value={formData.dni}
            onChange={(e) => handleInputChange('dni', e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-300/60 rounded-lg focus:outline-none focus:ring-0 focus:border-2 focus:border-base focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300"
            required
            autoComplete="current-password"
            maxLength="8"
            pattern="\d{8}"
            inputMode="numeric"
          />
        </div>

        {/* Checkbox de términos y condiciones */}
        <div className="flex items-center mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              className="form-checkbox rounded text-base border-gray-300 dark:border-gray-300/60 checked:border-base focus:ring-2 focus:ring-base focus:outline-none dark:bg-slate-700 dark:text-slate-300 dark:checked:border-base dark:checked:bg-base"
            />
            <span className="ml-2 text-md text-gray-600 dark:text-gray-300">
              Acepto las{' '}
              <a 
                href="/condiciones-de-servicio" 
                className="text-amarillo no-underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                condiciones del servicio
              </a>
              {' '}y las{' '}
              <a 
                href="/politicas-de-privacidad" 
                className="text-amarillo no-underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                políticas de privacidad
              </a>
            </span>
          </label>
        </div>

        {/* Botón de registro */}
        <div className="text-center mt-6">
          <button 
            type="submit"       
            className="w-full bg-base text-white py-3 uppercase rounded-md shadow-md hover:bg-azul dark:hover:bg-slate-600 transition duration-150 disabled:opacity-50 disabled:bg-base flex items-center justify-center"
            disabled={loading}
          >
            {loading && <IconLoading className="mr-2" />}
            Registrar
          </button>
        </div>

        {/* Mostrar error si existe */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;