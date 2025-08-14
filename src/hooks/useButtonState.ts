export const useButtonState = (estado: string) => {
  const isVisible = ["pendiente", "observado", "rechazado"].includes(estado);
  const isDisabled = ["tramitado", "rechazado", "aprobado"].includes(estado);
  
  return { isVisible, isDisabled };
};
