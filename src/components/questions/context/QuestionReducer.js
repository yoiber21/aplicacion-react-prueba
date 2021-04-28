import { CARGANDO, EDIT_PREGUNTA, REMOVE_PREGUNTA } from "../../../types";

const QuestionReducer = (state, action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: true,
      };

    case EDIT_PREGUNTA:
      const updatedPregunta = action.payload;

      const updatedPreguntas = state.preguntas.map((pregunta) => {
        if (pregunta.id === updatedPregunta.id) {
          return updatedPregunta;
        }
        return pregunta;
      });

      return {
        ...state,
        preguntas: updatedPreguntas,
      };

    case REMOVE_PREGUNTA:
      return {
        ...state,
        preguntas: state.preguntas.filter(
          (pregunta) => pregunta.id !== action.payload
        ),
      };

    case "ENVIADODATOS":
      return {
        ...state,
        peticion: true,
        cargando: false,
        preguntas: [...state.preguntas, action.payload],
      };
    default:
      return state;
  }
};

export default QuestionReducer;
