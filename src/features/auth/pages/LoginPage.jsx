import React from 'react';
import AuthImageSection from '../components/AuthImagenSection';
import AuthFormContainer from '../components/AuthFormContainer';

const LoginPage = () => {
  return (
    <div className="min-h-screen sm:flex-row flex flex-col sm:gap-0 gap-10 bg-white dark:bg-slate-900">
      <AuthImageSection />
      <AuthFormContainer />
      {/* TODO: Agregar cuando estén disponibles:
        <ButtonFloatTheme />
        <ButtonFloatPwa />
        <InstallPwaAppModal />
      */}
    </div>
  );
};

export default LoginPage;