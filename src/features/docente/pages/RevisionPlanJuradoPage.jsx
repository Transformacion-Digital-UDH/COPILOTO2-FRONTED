import RevisionPlanTesisBase from '../components/RevisionPlanTesisBase';

/**
 * Página específica para la revisión como jurado objetante
 */
const RevisionPlanJuradoPage = () => {
  return (
    <RevisionPlanTesisBase
      tipoRevisor="jurado"
      titulo="Revisión de Plan de Tesis - Jurado Objetante"
    />
  );
};

export default RevisionPlanJuradoPage;
