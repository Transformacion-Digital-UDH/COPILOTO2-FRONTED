/**
 * Utilidades para manejo de autenticación y tokens
 */

// Decodificar JWT sin verificación (solo para leer el payload)
export const decodeJWT = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }
    
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};

// Verificar si el token está cerca de expirar (5 minutos antes)
export const isTokenNearExpiry = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true; // Si no podemos decodificar, considerarlo expirado
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = decoded.exp;
  const bufferTime = 5 * 60; // 5 minutos en segundos
  
  return (expirationTime - currentTime) <= bufferTime;
};

// Verificar si el token ya expiró
export const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

// Limpiar completamente la sesión
export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.clear();
};

// Obtener datos de la sesión actual
export const getSessionData = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return {
      token,
      user,
      isValid: !!(token && user && !isTokenExpired(token))
    };
  } catch (error) {
    console.error('Error obteniendo datos de sesión:', error);
    return {
      token: null,
      user: null,
      isValid: false
    };
  }
};
