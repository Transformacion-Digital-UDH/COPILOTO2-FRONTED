import React from 'react';

const SnowFlake = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Copos de nieve animados */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
};

export default SnowFlake;
