// Feature: Programa Académico
// Exportaciones principales de la feature

// Pages
export { default as DesignarAsesorPage } from './pages/DesignarAsesorPage';
export { default as DesignarJuradoPage } from './pages/DesignarJuradoPage';
export { default as SolicitarResolucionPage } from './pages/SolicitarResolucionPage';

// Components
export { default as EstudianteTable } from './components/EstudianteTable';
export { default as DesignacionForm } from './components/DesignacionForm';
export { default as DesignacionTable } from './components/DesignacionTable';
export { default as JuradoTable } from './components/JuradoTable';
export { default as ResolucionTable } from './components/ResolucionTable';

// Hooks
export { useDesignaciones } from './hooks/useDesignaciones';
export { useJurados } from './hooks/useJurados';
export { useResoluciones } from './hooks/useResoluciones';

// Services
export { designacionService } from './services/designacionService';
export { juradoService } from './services/juradoService';
export { resolucionService } from './services/resolucionService';
