import React from 'react';
import AppProfile from '../components/AppProfile';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mi Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tu información personal y configuraciones de cuenta
          </p>
        </div>
        
        <AppProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
