import IncorrectRequisition from "./IncorrectRequisiton.js";

class ValidationError extends IncorrectRequisition {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }
}

export default ValidationError;