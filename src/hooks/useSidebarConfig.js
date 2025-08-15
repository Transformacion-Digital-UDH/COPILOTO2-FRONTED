import { useMemo, useState } from 'react';
import { sidebarConfig } from '../config/sidebar-config';

export const useSidebarConfig = (role) => {
  const [openSections, setOpenSections] = useState({});

  // Obtener configuración según el rol
  const sections = useMemo(() => {
    return sidebarConfig[role] || [];
  }, [role]);

  // Función para alternar sección
  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Verificar si una sección está abierta
  const isSectionOpen = (sectionName) => {
    return openSections[sectionName] || false;
  };

  // Verificar si un submenú está activo
  const isSubmenuActive = (path, currentPath) => {
    return currentPath === path;
  };

  // Verificar si una sección está activa (tiene submenús activos)
  const isSectionActive = (section, currentPath) => {
    return section.submenus.some(submenu => isSubmenuActive(submenu.path, currentPath));
  };

  // Abrir sección si tiene submenús activos
  const openActiveSections = (currentPath) => {
    const newOpenSections = {};
    sections.forEach(section => {
      if (isSectionActive(section, currentPath)) {
        newOpenSections[section.name] = true;
      }
    });
    setOpenSections(prev => ({ ...prev, ...newOpenSections }));
  };

  return {
    sections,
    toggleSection,
    isSectionOpen,
    isSubmenuActive,
    isSectionActive,
    openActiveSections
  };
};
