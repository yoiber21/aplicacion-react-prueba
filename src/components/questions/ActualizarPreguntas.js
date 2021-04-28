import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import QuestionContext from "./context/QuestionContext";

const ActualizarPreguntas = (route) => {

    let history = useHistory();
  const answersContext = useContext(QuestionContext);
  const { preguntas, editarPreguntas } = answersContext;

  const [datos, setDatos] = useState({
    descripcion: "",
  });

  const currentPregId = route.match.params.id;
  useEffect(() => {
    const respuestaId = currentPregId;
    const selectedData = preguntas.find(
      (currentRespuestaTraversal) =>
        currentRespuestaTraversal.id === parseInt(respuestaId)
    );
    console.log(selectedData);
    setDatos(selectedData);
  }, [currentPregId, preguntas]);

  const onSubmit = (e) => {
    e.preventDefault();
    editarPreguntas(datos);
    history.push("/");
  };

  const handleOnChange = (userKey, newValue) =>
    setDatos({ ...datos, [userKey]: newValue });

  if (!datos || !datos.id) {
    return <div className="text-center alert alert-danger">ID invalido.</div>;
  }

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
              onChange={(e) => handleOnChange("descripcion", e.target.value)}
              className="form-control"
              placeholder="¿Pregunta?"
            />
          </div>
          <div className="form-group mx-sm-3">
            <button
              type="submit"
              className="btn btn-outline-primary text-center"
                onClick={(e) => onSubmit(e)}
            >
              Enviar
            </button>
          </div>
          <div className="text-center  mt-4">
            <Link className="text-danger-500" to="/">
              Cancelar
            </Link>
          </div>
        </form>
      </div>

      {/* <ListaPreguntas /> */}
    </div>
  );
};

export default ActualizarPreguntas;
