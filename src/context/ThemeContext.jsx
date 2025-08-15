// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('current-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('current-theme', isDark ? 'dark' : 'light');

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = isDark ? '/titulacion/copiloto_ico_dark.png' : '/titulacion/copiloto_ico_light.png';
    }
  }, [isDark]);

  const setTheme = (theme) => {
    if (theme === 'light') setIsDark(false);
    else if (theme === 'dark') setIsDark(true);
    else if (theme === 'event') {
      setIsDark(true);
      document.documentElement.classList.add('event-theme');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
