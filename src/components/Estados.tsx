import React from "react";

interface EstadoProps {
  estado: string;
}

const Estado: React.FC<EstadoProps> = ({ estado }) => {
  const estadoLowerCase = estado?.toLowerCase();

  const getEstadoClase = () => {
    switch (estadoLowerCase) {
      case "rechazado":
        return "bg-red-500 text-white";
      case "pendiente":
        return "bg-gray-400 text-white";
      case "aceptado":
      case "tramitado":
      case "aprobado":
      case "emitido":
        return "bg-green-500 text-white dark:bg-green-600";
      case "observado":
        return "bg-orange-400 text-white";
      case "en_progreso":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const formatEstado = (texto: string) => {
    if (!texto) return "Pendiente";
    return texto
      .replace(/_/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <span
      className={`px-2 py-1 text-[0.775rem] font-normal rounded-md ${getEstadoClase()}`}
    >
      {formatEstado(estado)}
    </span>
  );
};

export default Estado;
