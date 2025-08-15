import React from "react";

// Icono simple de ojo
const IconEyeAbrir = ({ className }) => (
  <svg 
    className={`w-4 h-4 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
    />
  </svg>
);

const EyeButton = ({
  href,
  title,
  title2,
  defaultTitle = "Ver",
}) => {
  return (
    <a
      className="flex items-center text-sm m-2 rounded-lg border-[1px] border-gray-400 hover:bg-gray-300/60 dark:border-transparent dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white px-2 py-1 w-auto cursor-pointer"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconEyeAbrir className="mr-1" />
      <span>{title || defaultTitle} {title2}</span>
    </a>
  );
};

export default EyeButton;
