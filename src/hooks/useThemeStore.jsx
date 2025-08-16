import { useState, createContext, useContext, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

// Tipos de tema disponibles
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  EVENT: 'event'
};

// Configuración de temas
const THEME_CONFIG = {
  [THEMES.LIGHT]: {
    classes: ['light'],
    favicon: '/vite.svg' // Cambia por tu favicon claro
  },
  [THEMES.DARK]: {
    classes: ['dark'],
    favicon: '/vite.svg' // Cambia por tu favicon oscuro
  },
  [THEMES.EVENT]: {
    classes: ['dark', 'event-theme'],
    favicon: '/vite.svg' // Cambia por tu favicon de evento
  }
};

export const useThemeStore = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeStore must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEMES.LIGHT);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Función para aplicar el tema al DOM
  const applyTheme = useCallback((theme) => {
    const config = THEME_CONFIG[theme];
    if (!config) return;

    const documentElement = document.documentElement;
    const body = document.body;
    const favicon = document.querySelector('link[rel="icon"]');

    // Remover todas las clases de tema anteriores del html
    documentElement.classList.remove('light', 'dark', 'event-theme');
    
    // También remover del body si existe
    if (body) {
      body.classList.remove('light', 'dark', 'event-theme');
    }
    
    // Añadir nuevas clases al html
    config.classes.forEach(cls => {
      documentElement.classList.add(cls);
      if (body) {
        body.classList.add(cls);
      }
    });

    // Cambiar favicon si existe
    if (favicon) {
      favicon.href = config.favicon;
    }

    // Persistir en localStorage
    localStorage.setItem('theme', theme);
    setCurrentTheme(theme);
    
    // Debug info (comentado para producción)
    // console.log(`Tema aplicado: ${theme}`, {
    //   classes: config.classes,
    //   documentClasses: Array.from(documentElement.classList),
    //   bodyClasses: body ? Array.from(body.classList) : 'No body element'
    // });
  }, []);

  // Función para cambiar tema con transición suave
  const setTheme = useCallback((theme) => {
    if (!Object.values(THEMES).includes(theme)) {
      console.warn(`Tema inválido: ${theme}`);
      return;
    }

    if (currentTheme === theme) return;

    // Verificar soporte para View Transitions API
    if (!document.startViewTransition) {
      applyTheme(theme);
      return;
    }

    setIsTransitioning(true);
    document.startViewTransition(() => {
      applyTheme(theme);
    }).finished.finally(() => {
      setIsTransitioning(false);
    });
  }, [currentTheme, applyTheme]);

  // Toggle entre light y dark
  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
  }, [currentTheme, setTheme]);

  // Cycle entre todos los temas
  const cycleTheme = useCallback(() => {
    const themes = Object.values(THEMES);
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [currentTheme, setTheme]);

  // Verificadores de tema
  const isDark = currentTheme === THEMES.DARK || currentTheme === THEMES.EVENT;
  const isLight = currentTheme === THEMES.LIGHT;
  const isEvent = currentTheme === THEMES.EVENT;

  // Cargar tema inicial
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme && Object.values(THEMES).includes(savedTheme) 
      ? savedTheme 
      : systemPrefersDark ? THEMES.DARK : THEMES.LIGHT;

    // Forzar aplicación inmediata del tema
    // console.log('Aplicando tema inicial:', initialTheme);
    applyTheme(initialTheme);
  }, [applyTheme]);

  // Escuchar cambios en preferencias del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Solo aplicar si no hay tema guardado
      if (!localStorage.getItem('theme')) {
        const systemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  const value = {
    // Estado
    currentTheme,
    isDark,
    isLight,
    isEvent,
    isTransitioning,
    
    // Acciones
    setTheme,
    toggleTheme,
    cycleTheme,
    
    // Constantes
    themes: THEMES
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
