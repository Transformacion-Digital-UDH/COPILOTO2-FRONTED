import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import Login from '@/features/auth/Login';
import Registro from '@/features/auth/Registro';

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registro />} />

      {user?.role === 'estudiante' && (
        <Route path="/estudiante/designacion-asesor" element={<div>Vista estudiante</div>} />
      )}

      {user?.role === 'asesor' && (
        <Route path="/asesor/solicitud-asesoria" element={<div>Vista asesor</div>} />
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}