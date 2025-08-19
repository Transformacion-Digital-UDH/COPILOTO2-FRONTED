import React from 'react';
import PropTypes from 'prop-types';

const InicioDeTramite = ({
  title = 'TRÁMITE DE LA TITULACIÓN',
  description = 'Este es el inicio para el proceso de trámite de titulación, por favor dale clic en Iniciar trámite para empezar con el trámite de la designación de tu asesor',
  imageSrc = '/img/notInitSolicitude.svg',
  imageAlt = 'Iniciar trámite o solicitar asesor',
  buttonText = 'Iniciar trámite',
  onStartProcess,
  isDarkMode = false
}) => {
  const handleStartProcess = () => {
    if (onStartProcess) {
      onStartProcess();
    }
  };

  return (
    <div className="flex-1 p-[15px] font-roboto min-h-full">
      <div className={`p-10 space-y-10 text-center rounded-2xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-4xl font-semibold ${
          isDarkMode ? 'text-gray-400' : 'text-blue-700'
        }`}>
          {title}
        </h3>
        
        <div 
          className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex justify-center">
          <img 
            src={imageSrc}
            alt={imageAlt}
            className={`w-[40%] h-auto object-cover ${
              isDarkMode ? 'contrast-50' : ''
            }`}
          />
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={handleStartProcess}
            className={`px-6 py-3 rounded-lg text-xl font-medium font-poppins tracking-wide transition duration-300 text-white ${
              isDarkMode 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-teal-500 hover:bg-blue-700'
            }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

InicioDeTramite.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  buttonText: PropTypes.string,
  onStartProcess: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool
};

export default InicioDeTramite;