import { useMemo, useState, useCallback } from 'react';
import { sidebarConfig } from '../config/sidebar-config';

export const useSidebarConfig = (role) => {
  const [openSections, setOpenSections] = useState({});

  // Obtener configuración según el rol
  const sections = useMemo(() => {
    // Si no hay rol definido o es desarrollo, mostrar todos los enlaces organizados por rol
    if (!role || role === 'development') {
      // Combinar todas las configuraciones de todos los roles
      const allSections = [];

      // Procesar cada rol y agregar sus secciones
      Object.keys(sidebarConfig).forEach(roleKey => {
        sidebarConfig[roleKey].forEach(section => {
          allSections.push({
            ...section,
            name: `${roleKey}_${section.name}`, // ID único para evitar conflictos
            label: `${section.label} (${roleKey.toUpperCase()})`, // Mostrar el rol en el label
            originalRole: roleKey,
            // Agregar identificador de rol a cada submenu
            submenus: section.submenus.map(submenu => ({
              ...submenu,
              originalRole: roleKey
            }))
          });
        });
      });

      return allSections;
    }

    // Si hay rol específico, usar solo ese rol
    return sidebarConfig[role] || [];
  }, [role]);

  // Función para alternar sección
  const toggleSection = useCallback((sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  }, []);

  // Verificar si una sección está abierta
  const isSectionOpen = useCallback((sectionName) => {
    return openSections[sectionName] || false;
  }, [openSections]);

  // Verificar si un submenú está activo
  const isSubmenuActive = useCallback((path, currentPath) => {
    return currentPath === path;
  }, []);

  // Verificar si una sección está activa (tiene submenús activos)
  const isSectionActive = useCallback((section, currentPath) => {
    return section.submenus.some(submenu => isSubmenuActive(submenu.path, currentPath));
  }, [isSubmenuActive]);

  // Abrir sección si tiene submenús activos
  const openActiveSections = useCallback((currentPath) => {
    const newOpenSections = {};
    sections.forEach(section => {
      if (isSectionActive(section, currentPath)) {
        newOpenSections[section.name] = true;
      }
    });
    setOpenSections(prev => ({ ...prev, ...newOpenSections }));
  }, [sections, isSectionActive]);

  return {
    sections,
    toggleSection,
    isSectionOpen,
    isSubmenuActive,
    isSectionActive,
    openActiveSections
  };
};
