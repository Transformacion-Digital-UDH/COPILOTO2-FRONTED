import { useState } from 'react';
import { authAPI } from '../../../services/authAPI';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Registro de estudiante
  const registerStudent = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.registerStudent(data);
      
      // Si el registro es exitoso y viene con token (auto-login)
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.estudiante || response.user));
      }
      
      setLoading(false);
      return response;
    } catch (error) {
      setError(error.message || 'Error en el registro');
      setLoading(false);
      throw error;
    }
  };

  // Registro de docente
  const registerDocente = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.registerDocente(data);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error.message || 'Error en el registro');
      setLoading(false);
      throw error;
    }
  };

  // Login con Google
  const loginGoogle = async (googleToken) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.loginGoogle(googleToken);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      setLoading(false);
      return response;
    } catch (error) {
      setError(error.message || 'Error en el login con Google');
      setLoading(false);
      throw error;
    }
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    registerStudent,
    registerDocente,
    loginGoogle,
    clearError
  };
};