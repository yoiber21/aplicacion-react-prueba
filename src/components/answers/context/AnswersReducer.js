import { CARGANDO, EDIT_RESPUESTAS,REMOVE_RESPUESTAS } from "../../../types";

const AnswersReducer = (state  , action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: true,
      };

      case EDIT_RESPUESTAS:
      const updatedRespuesta = action.payload;

      const updatedRespuestas = state.respuestas.map((respuesta) => {
        if (respuesta.id === updatedRespuesta.id) {
          return updatedRespuesta;
        }
        return respuesta;
      });

      return {
        ...state,
        respuestas: updatedRespuestas,
      };


      case REMOVE_RESPUESTAS:
      return {
        ...state,
        respuestas: state.respuestas.filter(
          (respuesta) => respuesta.id !== action.payload
        ),
      };

    case "ENVIADODATOS":
      return {
        ...state,
        peticion: true,
        cargando: false,
        respuestas: [...state.respuestas, action.payload],
      };
    default:
      return state;
  }
};

export default AnswersReducer;
