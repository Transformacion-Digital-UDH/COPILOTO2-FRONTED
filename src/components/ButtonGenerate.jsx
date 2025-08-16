import React from "react";
import { useButtonState } from "../hooks/useButtonState";

const ButtonGenerate = ({ estado, label, onClick }) => {
  // Usar el hook compartido
  const { isVisible, isDisabled } = useButtonState(estado);

  const generarTramite = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  if (!isVisible) return null; // No renderiza nada si no es visible

  return (
    <button
      onClick={generarTramite}
      disabled={isDisabled}
      className={`px-4 py-1 mb-2 text-sm text-white bg-green-500 hover:bg-green-500/90 dark:bg-green-600 rounded-md hover:rounded-xl focus:outline-none relative ${
        isDisabled ? "cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default ButtonGenerate;
