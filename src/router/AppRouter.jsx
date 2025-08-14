import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRouter;