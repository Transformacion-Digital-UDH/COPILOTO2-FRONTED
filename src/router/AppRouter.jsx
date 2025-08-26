import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ProvidersWrapper from '../components/ProvidersWrapper';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import { SolicitudAsesorPage } from '../features/tesista';
import { DesignarAsesorPage, DesignarJuradoPage, SolicitarResolucionPage } from '../features/programa';
import { AceptarAsesoriaPage, RevisionPlanTesisPage } from '../features/docente';
import { RevisionPlanTecnicoPage, RevisionPlanMetodologicoPage, RevisionPlanJuradoPage } from '../features/docente';
import { EmitirResolucionPage, EmitirResolucionJuradoPage, EmitirResolucionAprobacionPage } from '../features/facultad';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <ProvidersWrapper>
              <DashboardPage />
            </ProvidersWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <ProvidersWrapper>
              <ProfilePage />
            </ProvidersWrapper>
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas del tesista */}
      <Route 
        path="/tesista/solicitar-asesor" 
        element={
          <ProtectedRoute requiredRole="estudiante">
            <ProvidersWrapper>
              <SolicitudAsesorPage />
            </ProvidersWrapper>
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas del docente/asesor */}
      <Route 
        path="/docente/aceptar-asesoria" 
        element={
          <ProtectedRoute requiredRole="docente">
            <ProvidersWrapper>
              <AceptarAsesoriaPage />
            </ProvidersWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/docente/revision-plan-tesis" 
        element={
          <ProtectedRoute requiredRole="docente">
            <ProvidersWrapper>
              <RevisionPlanTesisPage />
            </ProvidersWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/docente/revision-plan-tecnico" 
        element={
          <ProtectedRoute requiredRole="docente">
            <ProvidersWrapper>
              <RevisionPlanTecnicoPage />
            </ProvidersWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/docente/revision-plan-metodologico" 
        element={
          <ProtectedRoute requiredRole="docente">
            <ProvidersWrapper>
              <RevisionPlanMetodologicoPage />
            </ProvidersWrapper>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/docente/revision-plan-jurado" 
        element={
          <ProtectedRoute requiredRole="docente">
            <ProvidersWrapper>
              <RevisionPlanJuradoPage />
            </ProvidersWrapper>
          </ProtectedRoute>
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