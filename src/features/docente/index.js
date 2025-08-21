// Exportar todas las páginas del feature docente
export { default as AceptarAsesoriaPage } from './pages/AceptarAsesoriaPage';
export { default as RevisionPlanTesisPage } from './pages/RevisionPlanTesisPage';
export { default as RevisionPlanTecnicoPage } from './pages/RevisionPlanTecnicoPage';
export { default as RevisionPlanMetodologicoPage } from './pages/RevisionPlanMetodologicoPage';
export { default as RevisionPlanJuradoPage } from './pages/RevisionPlanJuradoPage';

// Exportar hooks
export { useAsesoriaData } from './hooks/useAsesoriaData';
export { useAsesoriaActions } from './hooks/useAsesoriaActions';
export { useRevisionPlanData } from './hooks/useRevisionPlanData';
export { useRevisionPlanActions } from './hooks/useRevisionPlanActions';

// Exportar componentes
export { default as AsesoriaTable } from './components/AsesoriaTable';
export { default as RevisionPlanTesisTable } from './components/RevisionPlanTesisTable';