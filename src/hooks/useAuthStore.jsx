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
  
  const login = (userData) => {
    setUser(userData);
    setRole(userData.role || 'tesista');
    setIsAuthenticated(true);
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
      login,
      logout,
      setRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
