import { useContext } from "react";
import Swal from "sweetalert2";
import UseForm from "../../hooks/UseForm";
import QuestionContext from "./context/QuestionContext";
import ListaPreguntas from "./ListaPreguntas";

const CrearPreguntas = () => {

    const answersContext = useContext(QuestionContext);
    const { registrarPreguntas } = answersContext;

    const [datos, handleInputChange, clear] = UseForm({
        descripcion: "",
      });

      const onSubmitt = async (_) => {
        _.preventDefault();
        if (
            datos.descripcion === "" 
          ) {
            Swal.fire({
              title: "Atención!",
              icon: "warning",
              text: "Digite todos los datos",
              showConfirmButton: false,
              timer: 1500
            })
            return;
          }else {
            await registrarPreguntas(datos);
            clear();
          }
      };
    
  return (
    <div className="mt-5">
      <h1 className="alert alert-success text-center container">
        Crear Preguntas
      </h1>
      <div className="m-0 row justify-content-center mt-5">
        <form>
          <div className="form-group mx-sm-3">
            <input
              type="text"
              name="descripcion"
              value={datos.descripcion}
              onChange={(e) => handleInputChange(e)}
              className="form-control"
              placeholder="¿Pregunta?"
            />
          </div>
          <div className="form-group mx-sm-3">
            <button
              type="submit"
              className="btn btn-outline-primary text-center"
              onClick={(e) => onSubmitt(e)}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <ListaPreguntas />
    </div>
  );
};

export default CrearPreguntas;
