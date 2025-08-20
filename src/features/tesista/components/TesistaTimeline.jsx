import React from 'react';
import { Check, Clock, Lock } from 'lucide-react';

/**
 * Componente de línea de tiempo para el proceso de tesis del tesista
 * Muestra el progreso visual del estudiante a través de las etapas
 */
const TesistaTimeline = ({ currentPath, onNavigate }) => {
  // Estados de la línea de tiempo
  const timelineSteps = [
    {
      id: 'plan-tesis',
      title: 'Plan de tesis',
      status: 'completed',
      path: '/tesista/plan-tesis',
      implemented: false
    },
    {
      id: 'designacion-asesores',
      title: 'Designación de Asesores',
      status: 'current',
      path: '/tesista/solicitar-asesor',
      implemented: true
    },
    {
      id: 'aprobacion-plan',
      title: 'Aprobación de Plan de tesis',
      status: 'pending',
      path: '/tesista/aprobacion-plan',
      implemented: false
    },
    {
      id: 'ejecucion',
      title: 'Ejecución',
      status: 'pending',
      path: '/tesista/ejecucion',
      implemented: false
    },
    {
      id: 'informe-final',
      title: 'Informe Final',
      status: 'pending',
      path: '/tesista/informe-final',
      implemented: false
    },
    {
      id: 'designacion-jurados',
      title: 'Designación de Jurados',
      status: 'pending',
      path: '/tesista/designacion-jurados',
      implemented: false
    },
    {
      id: 'aprobacion-informe',
      title: 'Aprobación de Informe final',
      status: 'pending',
      path: '/tesista/aprobacion-informe-final',
      implemented: false
    },
    {
      id: 'sustentacion',
      title: 'Sustentación',
      status: 'pending',
      path: '/tesista/sustentacion',
      implemented: false
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-white" />;
      case 'current':
        return <Clock className="w-4 h-4 text-white" />;
      case 'pending':
        return <Lock className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300 dark:bg-gray-600';
      default:
        return 'bg-gray-300';
    }
  };

  const getLineColor = (currentStatus, nextStatus) => {
    if (currentStatus === 'completed') {
      return 'bg-green-500';
    }
    if (currentStatus === 'current' && nextStatus === 'pending') {
      return 'bg-gradient-to-b from-blue-500 to-gray-300';
    }
    return 'bg-gray-300 dark:bg-gray-600';
  };

  const handleStepClick = (step) => {
    if (step.implemented && step.path) {
      onNavigate(step.path);
    } else if (!step.implemented) {
      // Mostrar mensaje de no implementado
      alert(`"${step.title}" aún no está implementado`);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Proceso de Tesis
      </h3>
      
      <div className="relative">
        {timelineSteps.map((step, index) => (
          <div key={step.id} className="relative flex items-start mb-2 last:mb-0">
            {/* Línea vertical */}
            {index < timelineSteps.length - 1 && (
              <div 
                className={`absolute left-4 top-8 w-0.5 h-12 ${
                  getLineColor(step.status, timelineSteps[index + 1]?.status)
                }`}
              />
            )}
            
            {/* Círculo del estado */}
            <div className={`
              relative z-10 flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0
              ${getStatusColor(step.status)}
              ${step.implemented ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-not-allowed'}
            `}>
              {getStatusIcon(step.status)}
            </div>
            
            {/* Contenido del paso */}
            <div className="ml-4 flex-1">
              <button
                onClick={() => handleStepClick(step)}
                className={`
                  text-left w-full p-2 rounded-lg transition-all duration-200
                  ${step.implemented 
                    ? 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' 
                    : 'cursor-not-allowed opacity-60'
                  }
                  ${currentPath === step.path ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' : ''}
                `}
                disabled={!step.implemented}
              >
                <div className="flex items-center justify-between">
                  <h4 className={`
                    font-medium text-sm
                    ${step.status === 'completed' ? 'text-green-700 dark:text-green-400' : ''}
                    ${step.status === 'current' ? 'text-blue-700 dark:text-blue-400' : ''}
                    ${step.status === 'pending' ? 'text-gray-500 dark:text-gray-400' : ''}
                  `}>
                    {step.title}
                  </h4>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TesistaTimeline;
