import React from "react";

const ButtonRequest = ({
  label,
  loading = false,
  disabled = false,
  onClick
}) => {
  const enviarSolicitud = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      onClick={enviarSolicitud}
      className={`px-5 py-2 min-w-[200px] text-white rounded-md text-sm font-medium ${
        isDisabled
          ? "bg-gray-300 dark:bg-gray-600 dark:text-gray-500 cursor-not-allowed"
          : "bg-base hover:bg-azul dark:bg-green-500 dark:hover:bg-green-600"
      }`}
    >
      {loading ? "Enviando..." : label}
      <i className="fas fa-edit ml-2"></i>
    </button>
  );
};

export default ButtonRequest;
