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
  // Inicializar con datos del localStorage si existen
  const getInitialUser = () => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('user');
      return null;
    }
  };

  const getInitialToken = () => {
    return localStorage.getItem('token') || null;
  };

  const initialUser = getInitialUser();
  const initialToken = getInitialToken();

  const [user, setUser] = useState(initialUser);
  const [role, setRole] = useState(initialUser?.role || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken && !!initialUser);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(initialToken);
  
  const login = (userData, authToken = null) => {
    // Filtrar solo datos esenciales para el frontend
    const essentialUserData = {
      id: userData.id,
      fullName: userData.fullName || userData.nombre,
      email: userData.email,
      role: userData.role || userData.rol,
      // Solo incluir imagen si existe y es necesaria
      ...(userData.imagen && { imagen: userData.imagen })
    };
    
    setUser(essentialUserData);
    setRole(essentialUserData.role || null);
    setIsAuthenticated(true);
    
    // Guardar solo datos esenciales en localStorage
    localStorage.setItem('user', JSON.stringify(essentialUserData));
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
      console.log('Login mock exitoso:', mockUser);
    } catch (error) {
      console.error('Error en login mock:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login usando API real
  const googleLogin = async (googleResponse) => {
    setLoading(true);
    try {
      // Importar authAPI dinámicamente para evitar problemas de circular dependency
      const { authAPI } = await import('../services/authAPI');
      
      // Enviar el token de Google a nuestro backend
      const response = await authAPI.loginGoogle(googleResponse.credential || googleResponse.access_token);
      
      // Si el backend devuelve un token JWT y datos del usuario
      if (response.token && response.user) {
        const userData = {
          fullName: response.user.nombre || response.user.fullName,
          email: response.user.email,
          role: response.user.rol || response.user.role,
          id: response.user.id,
          imagen: response.user.imagen
        };
        
        // Usar la función login que ya maneja localStorage
        login(userData, response.token);
        
        // Redirigir al dashboard (será manejado en el componente)
        // La navegación se manejará en el useEffect del componente que use este hook
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
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirigir al login
    window.location.href = '/login';
  };

  // Función para verificar si el token es válido (opcional)
  const checkTokenValidity = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      logout();
      return false;
    }
    
    try {
      // Aquí podrías hacer una llamada al backend para verificar el token
      // const response = await authAPI.verifyToken();
      return true;
    } catch (error) {
      console.error('Token inválido:', error);
      logout();
      return false;
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
      // Actualizar localStorage también
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Efecto para sincronizar cambios en localStorage entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        // Recargar datos del localStorage si cambiaron en otra pestaña
        const newToken = localStorage.getItem('token');
        const newUser = localStorage.getItem('user');
        
        if (!newToken || !newUser) {
          // Si se eliminaron, hacer logout
          logout();
        } else {
          try {
            const parsedUser = JSON.parse(newUser);
            setUser(parsedUser);
            setRole(parsedUser.role || null);
            setToken(newToken);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error parsing user from storage:', error);
            logout();
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
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
      checkTokenValidity
    }}>
      {children}
    </AuthContext.Provider>
  );
};
