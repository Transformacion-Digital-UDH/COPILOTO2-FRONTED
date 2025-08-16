import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Título principal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide text-gray-900 dark:text-white">
          TRÁMITE DE LA TITULACIÓN
        </h1>
      </div>
    </div>
  );
};

export default DashboardPage;
