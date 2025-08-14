import React from "react";
import { useButtonState } from "../hooks/useButtonState";

interface ButtonObserveProps {
  estado: string;
  label: string;
  onClick?: () => void;
}

const ButtonObserve: React.FC<ButtonObserveProps> = ({ estado, label, onClick }) => {
  // Usar el hook compartido
  const { isVisible, isDisabled } = useButtonState(estado);

  const observarTramite = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  if (!isVisible) return null; // No renderiza si no es visible

  return (
    <button
      onClick={observarTramite}
      disabled={isDisabled}
      className={`px-3 py-1 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-md hover:rounded-xl focus:outline-none transition-all duration-200 ${
        isDisabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default ButtonObserve;
