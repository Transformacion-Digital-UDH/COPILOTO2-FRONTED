import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ProvidersWrapper from '../components/ProvidersWrapper';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import { SolicitudAsesorPage } from '../features/tesista';
import { DesignarAsesorPage, DesignarJuradoPage, SolicitarResolucionPage } from '../features/programa';
import { AceptarAsesoriaPage, RevisionPlanTesisPage, RevisionPlanTecnicoPage, RevisionPlanMetodologicoPage, RevisionPlanJuradoPage } from '../features/asesor';
import { EmitirResolucionPage, EmitirResolucionJuradoPage, EmitirResolucionAprobacionPage } from '../features/facultad';

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
      <Route 
        path="/perfil" 
        element={
          <ProvidersWrapper>
            <ProfilePage />
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
      <Route 
        path="/asesor/revision-plan-tecnico" 
        element={
          <ProvidersWrapper>
            <RevisionPlanTecnicoPage />
          </ProvidersWrapper>
        } 
      />
      <Route 
        path="/asesor/revision-plan-metodologico" 
        element={
          <ProvidersWrapper>
            <RevisionPlanMetodologicoPage />
          </ProvidersWrapper>
        } 
      />
      <Route 
        path="/asesor/revision-plan-jurado" 
        element={
          <ProvidersWrapper>
            <RevisionPlanJuradoPage />
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
      
      {/* Rutas de facultad */}
      <Route 
        path="/facultad/emitir-resolucion-asesor" 
        element={
          <ProvidersWrapper>
            <EmitirResolucionPage />
          </ProvidersWrapper>
        } 
      />
      <Route 
        path="/facultad/emitir-resolucion-jurado" 
        element={
          <ProvidersWrapper>
            <EmitirResolucionJuradoPage />
          </ProvidersWrapper>
        } 
      />
      <Route 
        path="/facultad/emitir-resolucion-aprobacion" 
        element={
          <ProvidersWrapper>
            <EmitirResolucionAprobacionPage />
          </ProvidersWrapper>
        } 
      />
    </Routes>
  );
};

export default AppRouter;