import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ProvidersWrapper from '../components/ProvidersWrapper';
import DashboardPage from '../pages/DashboardPage';
import { SolicitudAsesorPage } from '../features/tesista';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProvidersWrapper>
            <DashboardPage />
          </ProvidersWrapper>
        } 
      />
      {/* Rutas del tesista */}
      <Route 
        path="/tesista/solicitar-asesor" 
        element={
          <ProvidersWrapper>
            <SolicitudAsesorPage />
          </ProvidersWrapper>
        } 
      />
    </Routes>
  );
};

export default AppRouter;