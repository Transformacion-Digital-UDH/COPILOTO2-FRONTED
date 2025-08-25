import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const GoogleLoginButton = () => {
  const { isLoading, googleLogin } = useGoogleAuth();

  const handleSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    googleLogin(credentialResponse);
  };

  const handleError = () => {
    console.log('Google Login Failed');
    alert('Error al iniciar sesión con Google');
  };

  return (
    <div className="mb-6">
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false}
          theme="outline"
          size="large"
          width="100%"
          text="signin_with"
          shape="rectangular"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default GoogleLoginButton;