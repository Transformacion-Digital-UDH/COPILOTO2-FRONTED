import React from 'react';
import AuthInitializer from './components/AuthInitializer';
import AppRouter from './router/AppRouter';
import './App.css';

function App() {
  return (
    <AuthInitializer>
      <AppRouter />
    </AuthInitializer>
  );
}

export default App;
