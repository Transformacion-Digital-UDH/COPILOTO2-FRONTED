import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthStore = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthStore must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Cache de usuario en sessionStorage (más seguro que localStorage)
  const getUserCache = () => {
    try {
      const cached = sessionStorage.getItem('userCache');
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Error parsing user cache:', error);
      sessionStorage.removeItem('userCache');
      return null;
    }
  };

  const getLastFetch = () => {
    return parseInt(sessionStorage.getItem('lastUserFetch') || '0', 10);
  };

  // Solo guardar token en localStorage (necesario para API calls)
  const getInitialToken = () => {
    return localStorage.getItem('token') || null;
  };

  const initialUserCache = getUserCache();
  const initialToken = getInitialToken();
  const initialLastFetch = getLastFetch();

  const [user, setUser] = useState(initialUserCache);
  const [role, setRole] = useState(initialUserCache?.role || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken && !!initialUserCache);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(initialToken);
  const [lastFetch, setLastFetch] = useState(initialLastFetch);

  // Configuración de cache
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  // Función para determinar si necesitamos actualizar los datos del usuario
  const shouldRefreshUser = () => {
    const now = Date.now();
    return (
      !user ||                                    // Sin datos de usuario
      (now - lastFetch) > CACHE_DURATION ||       // Cache expirado
      !sessionStorage.getItem('userCache')        // Cache eliminado
    );
  };

  // Función para obtener datos frescos del usuario desde la API
  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Importar authAPI dinámicamente
      const { authAPI } = await import('../services/authAPI');
      const response = await authAPI.getUserProfile();
      
      if (response.success && response.profile) {
        // Normalizar datos del usuario
        const userData = {
          id: response.profile.usuario_id,
          fullName: `${response.profile.est_nombre} ${response.profile.est_apellido_paterno} ${response.profile.est_apellido_materno}`.trim(),
          email: response.email,
          role: response.role,
          codigo: response.profile.est_codigo,
          dni: response.profile.est_dni,
          ciclo: response.profile.est_ciclo,
          programa: response.profile.program_id?.pa_nombre,
          facultad: response.profile.program_id?.facultad_id?.fa_nombre,
          // Agregar más campos según necesites
        };

        // Actualizar estado
        setUser(userData);
        setRole(userData.role);
        setIsAuthenticated(true);
        
        // Guardar en cache de sesión
        sessionStorage.setItem('userCache', JSON.stringify(userData));
        sessionStorage.setItem('lastUserFetch', Date.now().toString());
        setLastFetch(Date.now());
        
        return userData;
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      // Si hay error, limpiar sesión
      logout();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función mejorada de login que solo guarda lo esencial
  const login = (userData, authToken = null) => {
    // Filtrar solo datos esenciales para el frontend
    const essentialUserData = {
      id: userData.id,
      fullName: userData.fullName || userData.nombre,
      email: userData.email,
      role: userData.role || userData.rol,
      // Solo incluir campos adicionales si existen
      ...(userData.codigo && { codigo: userData.codigo }),
      ...(userData.dni && { dni: userData.dni }),
      ...(userData.ciclo && { ciclo: userData.ciclo }),
      ...(userData.programa && { programa: userData.programa }),
      ...(userData.facultad && { facultad: userData.facultad }),
    };
    
    setUser(essentialUserData);
    setRole(essentialUserData.role || null);
    setIsAuthenticated(true);
    
    // Solo guardar en sessionStorage (más seguro)
    sessionStorage.setItem('userCache', JSON.stringify(essentialUserData));
    sessionStorage.setItem('lastUserFetch', Date.now().toString());
    setLastFetch(Date.now());
    
    // Solo guardar token en localStorage (necesario para API calls)
    if (authToken) {
      localStorage.setItem('token', authToken);
      setToken(authToken);
    }
  };

  // Mock login con email y password (para pruebas del formulario)
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - solo acepta emails que terminen en @udh.edu.pe
      if (!email.endsWith('@udh.edu.pe')) {
        throw new Error('El correo debe terminar en @udh.edu.pe');
      }
      
      const mockUser = {
        fullName: 'Usuario Test',
        email: email,
        role: null // Sin rol específico para desarrollo
      };
      
      login(mockUser);
    } catch (error) {
      console.error('Error en login mock:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login mejorado con enfoque híbrido
  const googleLogin = async (googleResponse) => {
    setLoading(true);
    try {
      // Importar authAPI dinámicamente
      const { authAPI } = await import('../services/authAPI');
      
      // Enviar el token de Google a nuestro backend
      const response = await authAPI.loginGoogle(googleResponse.credential || googleResponse.access_token);
      
      // Si el backend devuelve un token JWT
      if (response.token) {
        // Guardar solo el token
        localStorage.setItem('token', response.token);
        setToken(response.token);
        
        // Obtener datos frescos del usuario desde /usuarios/me
        await fetchUserData();
        
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error en Google login:', error);
      const errorMessage = error.message || 'Error al iniciar sesión con Google';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    // Limpiar estado
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    setToken(null);
    setLastFetch(0);
    
    // Limpiar almacenamiento
    localStorage.removeItem('token');
    sessionStorage.removeItem('userCache');
    sessionStorage.removeItem('lastUserFetch');
    
    // Redirigir al login
    window.location.href = '/login';
  };

  // Función para verificar y refrescar datos del usuario si es necesario
  const ensureFreshUserData = async () => {
    if (shouldRefreshUser() && token) {
      try {
        await fetchUserData();
      } catch (error) {
        console.error('Error al refrescar datos del usuario:', error);
      }
    }
  };

  // Función para cambiar de rol temporalmente (solo para desarrollo)
  const changeRole = (newRole) => {
    setRole(newRole);
    if (user) {
      const updatedUser = {
        ...user,
        role: newRole
      };
      setUser(updatedUser);
      // Actualizar sessionStorage también
      sessionStorage.setItem('userCache', JSON.stringify(updatedUser));
    }
  };

  // Efecto para refrescar datos en eventos importantes
  useEffect(() => {
    // Solo refrescar si hay token y no estamos cargando
    if (token && !loading && shouldRefreshUser()) {
      ensureFreshUserData();
    }
  }, [token]);

  // Efecto para sincronizar cambios en localStorage entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        const newToken = localStorage.getItem('token');
        
        if (!newToken) {
          // Si se eliminó el token, hacer logout
          logout();
        } else if (newToken !== token) {
          // Si cambió el token, actualizar y refrescar datos
          setToken(newToken);
          fetchUserData();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [token]);
  
  return (
    <AuthContext.Provider value={{ 
      user,
      role,
      isAuthenticated,
      loading,
      token,
      login,
      logout,
      setRole,
      changeRole,
      handleLogin,
      googleLogin,
      fetchUserData,
      ensureFreshUserData,
      shouldRefreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
