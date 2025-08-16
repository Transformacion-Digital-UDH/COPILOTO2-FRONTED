import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuthStore = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthStore must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ fullName: 'Usuario Tesista' });
  const [role, setRole] = useState('tesista'); // Valor por defecto cambiado a tesista
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Para demo, directamente loggeado
  const [loading, setLoading] = useState(false);
  
  const login = (userData) => {
    setUser(userData);
    setRole(userData.role || 'tesista');
    setIsAuthenticated(true);
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
        role: 'tesista'
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

  // Mock Google login (funcionalidad principal)
  const googleLogin = async (response) => {
    setLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        fullName: 'Usuario Google',
        email: 'usuario@udh.edu.pe',
        role: 'tesista',
        googleId: 'mock_google_id'
      };
      
      login(mockUser);
      console.log('Google login mock exitoso:', mockUser);
    } catch (error) {
      console.error('Error en Google login mock:', error.message);
      alert('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setRole('tesista');
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ 
      user,
      role,
      isAuthenticated,
      loading,
      login,
      logout,
      setRole,
      handleLogin,
      googleLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
