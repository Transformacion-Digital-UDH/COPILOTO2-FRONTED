import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ProvidersWrapper from '../components/ProvidersWrapper';
import DashboardPage from '../pages/DashboardPage';
import { SolicitudAsesorPage } from '../features/tesista';
import { DesignarAsesorPage, DesignarJuradoPage, SolicitarResolucionPage } from '../features/programa';
import { AceptarAsesoriaPage, RevisionPlanTesisPage } from '../features/asesor';

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
      
      {/* Rutas del asesor */}
      <Route 
        path="/asesor/aceptar-asesoria" 
        element={
          <ProvidersWrapper>
            <AceptarAsesoriaPage />
          </ProvidersWrapper>
        } 
      />
      <Route 
        path="/asesor/revision-plan-tesis" 
        element={
          <ProvidersWrapper>
            <RevisionPlanTesisPage />
          </ProvidersWrapper>
        } 
      />
      
      {/* Rutas del programa académico */}
      <Route 
        path="/programa/designar-asesor" 
        element={
          <ProvidersWrapper>
            <DesignarAsesorPage />
          </ProvidersWrapper>
        } 
      />
      <Route 
        path="/programa/designar-jurado" 
        element={
          <ProvidersWrapper>
            <DesignarJuradoPage />
          </ProvidersWrapper>
        } 
      />
      <Route 
        path="/programa/solicitar-resolucion" 
        element={
          <ProvidersWrapper>
            <SolicitarResolucionPage />
          </ProvidersWrapper>
        } 
      />
    </Routes>
  );
};

export default AppRouter;