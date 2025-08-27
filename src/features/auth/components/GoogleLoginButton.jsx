import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { isLoading, googleLogin } = useGoogleAuth();

  const handleSuccess = (credentialResponse) => {
    googleLogin(credentialResponse, () => {
      // Callback de éxito: navegar al dashboard
      navigate('/dashboard', { replace: true });
    });
  };

  const handleError = (error) => {
    console.log('❌ Google Login Error:', error);
    alert('Error al iniciar sesión con Google');
  };

  return (
    <div className="mb-6">
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false}
          auto_select={false}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default GoogleLoginButton;