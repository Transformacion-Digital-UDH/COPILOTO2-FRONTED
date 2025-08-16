import { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';

export const useAuthForm = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { handleLogin: authLogin } = useAuthStore(); // O useContext

  const normalizeEmail = () => {
    setEmail(prev => prev.toString().toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await authLogin(email, password);
  };

  return {
    isPassword,
    setIsPassword,
    email,
    setEmail,
    password,
    setPassword,
    normalizeEmail,
    handleLogin
  };
};