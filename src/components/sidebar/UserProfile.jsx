import React from 'react';

const UserProfile = ({
  fullName,
  role,
  imageProfile,
  isOpen
}) => {
  const defaultImageProfile = imageProfile || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;

  return (
    <div className={`
      flex flex-col items-center justify-center mt-6 transition-opacity duration-300
      ${isOpen ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className="w-24 h-24 mb-4 overflow-hidden rounded-full shadow-lg">
        <img 
          className="object-cover w-full h-full" 
          src={defaultImageProfile} 
          alt="Avatar" 
        />
      </div>
      <div className="w-full text-center max-w-44">
        <h2 className="text-xl font-semibold break-words mb-3 uppercase">
          {fullName}
        </h2>
        <p className="inline-flex items-center gap-2 text-xl font-medium text-[#48A6A7] dark:text-white border-b-4 border-[#EFB036] pb-1 transition-all capitalize">
          {role}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
