import { lineasInvestigacionService } from '../services/lineasInvestigacionService.js';

/**
 * Utilidad para testing y debug de JWT
 */

/**
 * 🔧 Simular login y guardar token para testing
 */
export const debugJWT = {
  // Token de ejemplo para testing (NO usar en producción)
  mockToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVzdHVkaWFudGUgVGVzdCIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6ImVzdHVkaWFudGUiLCJwcm9ncmFtYV9pZCI6MX0.example',

  /**
   * 🔍 Buscar endpoints de asesores disponibles
   */
  findAsesorEndpoints: async () => {
    return await lineasInvestigacionService.findAsesorEndpoint();
  },

  /**
   * 🎯 Guardar token mock para testing
   */
  setMockToken: () => {
    const mockToken = debugJWT.mockToken;
    const mockUser = {
      id: 1,
      name: 'Estudiante Test',
      email: 'estudiante@udh.edu.pe',
      role: 'estudiante',
      programa_id: 1
    };

    localStorage.setItem('token', mockToken);
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('userData', JSON.stringify(mockUser));
    
    return { token: mockToken, user: mockUser };
  },

  /**
   * 🔍 Verificar tokens en localStorage
   */
  checkTokens: () => {
    const tokens = {
      token: localStorage.getItem('token'),
      authToken: localStorage.getItem('authToken'),
      user: localStorage.getItem('user'),
      userData: localStorage.getItem('userData')
    };

    return tokens;
  },

  /**
   * 🗑️ Limpiar tokens
   */
  clearTokens: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
  },

  /**
   * 🎯 Login real (conectar con tu API de auth)
   */
  realLogin: async (credentials) => {
    try {
      // Aquí harías la petición real a tu endpoint de login
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userData', JSON.stringify(data.user));

        return { success: true, data };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Hacer disponible globalmente para testing en consola
if (typeof window !== 'undefined') {
  window.debugJWT = debugJWT;
}
