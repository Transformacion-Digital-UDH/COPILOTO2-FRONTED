// Exportar todas las páginas del feature facultad
export { default as EmitirResolucionPage } from './pages/EmitirResolucionAsesorPage';
export { default as EmitirResolucionJuradoPage } from './pages/EmitirResolucionJuradoPage';
export { default as EmitirResolucionAprobacionPage } from './pages/EmitirResolucionAprobacionPage';

// Exportar hooks
export { useResolucionAsesorData } from './hooks/useResolucionAsesorData';
export { useResolucionAsesorActions } from './hooks/useResolucionAsesorActions';
export { useResolucionJuradoData } from './hooks/useResolucionJuradoData';
export { useResolucionJuradoActions } from './hooks/useResolucionJuradoActions';
export { useResolucionAprobacionData } from './hooks/useResolucionAprobacionData';
export { useResolucionAprobacionActions } from './hooks/useResolucionAprobacionActions';

// Exportar componentes
export { default as EmitirResolucionAsesorTable } from './components/EmitirResolucionAsesorTable';
export { default as EmitirResolucionJuradoTable } from './components/EmitirResolucionJuradoTable';
export { default as EmitirResolucionAprobacionTable } from './components/EmitirResolucionAprobacionTable';
