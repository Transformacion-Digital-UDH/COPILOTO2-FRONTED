import { useState, useEffect } from 'react'
import AppRouter from './router/AppRouter'
import './App.css'

// Importar utilidad de debug en desarrollo
if (import.meta.env.DEV) {
  import('./utils/debugJWT.js');
}

function App() {
  useEffect(() => {
    // Solo en desarrollo - mostrar información de debug
    if (import.meta.env.DEV) {
      console.log('🚀 App iniciada en modo desarrollo');
      console.log('📍 API URL:', import.meta.env.VITE_API_BASE_URL);
      console.log('🔧 Para testing JWT, usa: window.debugJWT.setMockToken()');
    }
  }, []);

  return (
    <AppRouter />
  )
}

export default App
