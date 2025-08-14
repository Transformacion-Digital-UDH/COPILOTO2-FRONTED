import React from "react";
import styles from "./AnimatedBorder.module.css";

interface AnimatedBorderProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  darkMode?: boolean; // Nueva prop para controlar el modo
}

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  onClick,
  className = "",
  darkMode = false, // Por defecto modo claro
}) => {
  // Seleccionar la clase según el modo
  const wrapperClass = darkMode
    ? styles.cardWrapperDark
    : styles.cardWrapperLight;

  return (
    <button
      onClick={onClick}
      className={`size-auto rounded-xl flex items-center justify-center group dark:text-white text-gray-800 ${className}`}
    >
      <div className="h-full w-full p-0.5 rounded-lg relative overflow-hidden">
        <div className={`${wrapperClass} relative h-full`}>
          <div className="relative z-10 bg-gradient-to-br from-gray-100 dark:from-gray-800 dark:group-hover:to-base group-hover:to-[#f1cc7a] dark:to-gray-700 to-gray-200 h-full rounded-[7px] ring-[2px] dark:ring-white/10 ring-black/15 transition-colors">
            <div className="h-full flex items-center justify-center lg:gap-2 gap-1 px-2 lg:px-3 py-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default AnimatedBorder;
