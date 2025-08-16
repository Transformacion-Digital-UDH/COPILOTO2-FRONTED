import React from 'react';
import RoleBasedLayout from './RoleBasedLayout';

/**
 * Layout estándar para páginas del dashboard
 * Incluye header, sidebar y área de contenido principal
 */
const StandardLayout = ({ children, ...props }) => {
  return (
    <RoleBasedLayout
      showHeader={true}
      showSidebar={true}
      showFooter={false}
      fullHeight={true}
      {...props}
    >
      {children}
    </RoleBasedLayout>
  );
};

/**
 * Layout minimalista para páginas de enfoque
 * Solo header y contenido (sin sidebar)
 */
const FocusLayout = ({ children, ...props }) => {
  return (
    <RoleBasedLayout
      showHeader={true}
      showSidebar={false}
      showFooter={false}
      fullHeight={true}
      {...props}
    >
      {children}
    </RoleBasedLayout>
  );
};

/**
 * Layout completo con footer
 * Para páginas informativas o de configuración
 */
const FullLayout = ({ children, ...props }) => {
  return (
    <RoleBasedLayout
      showHeader={true}
      showSidebar={true}
      showFooter={true}
      fullHeight={true}
      {...props}
    >
      {children}
    </RoleBasedLayout>
  );
};

/**
 * Layout limpio sin navegación
 * Para modales, formularios standalone, etc.
 */
const CleanLayout = ({ children, ...props }) => {
  return (
    <RoleBasedLayout
      showHeader={false}
      showSidebar={false}
      showFooter={false}
      fullHeight={false}
      containerClass="bg-white dark:bg-gray-800"
      {...props}
    >
      {children}
    </RoleBasedLayout>
  );
};

/**
 * Layout para páginas de proceso/flujo
 * Con área de contenido centrada y limitada en ancho
 */
const ProcessLayout = ({ children, ...props }) => {
  return (
    <RoleBasedLayout
      showHeader={true}
      showSidebar={true}
      showFooter={false}
      fullHeight={true}
      contentClass="flex items-center justify-center"
      {...props}
    >
      <div className="w-full max-w-4xl mx-auto">
        {children}
      </div>
    </RoleBasedLayout>
  );
};

export {
  RoleBasedLayout as BaseLayout,
  StandardLayout,
  FocusLayout,
  FullLayout,
  CleanLayout,
  ProcessLayout
};
