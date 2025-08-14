import { useMemo, useState } from 'react';
import { sidebarConfig, SidebarSection } from '../config/sidebar-config';

export const useSidebarConfig = (role: string) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Obtener configuración según el rol
  const sections = useMemo(() => {
    return sidebarConfig[role] || [];
  }, [role]);

  // Función para alternar sección
  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Verificar si una sección está abierta
  const isSectionOpen = (sectionName: string) => {
    return openSections[sectionName] || false;
  };

  // Verificar si un submenú está activo
  const isSubmenuActive = (path: string, currentPath: string) => {
    return currentPath === path;
  };

  // Verificar si una sección está activa (tiene submenús activos)
  const isSectionActive = (section: SidebarSection, currentPath: string) => {
    return section.submenus.some(submenu => isSubmenuActive(submenu.path, currentPath));
  };

  // Abrir sección si tiene submenús activos
  const openActiveSections = (currentPath: string) => {
    const newOpenSections: Record<string, boolean> = {};
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
