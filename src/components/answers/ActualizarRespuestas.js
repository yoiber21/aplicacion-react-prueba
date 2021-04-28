import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { url } from "../../config/variables";
import AnswersContext from "./context/AnswersContext";

const ActualizarRespuestas = (route) => {
  let history = useHistory();
  const answersContext = useContext(AnswersContext);
  const { editarRespuesta, respuestas } = answersContext;
  const [dataPre, setDataPre] = useState([]);
  const [datos, setDatos] = useState({
    descripcion: "",
    respuesta: "",
    correcta: "",
  });

 
 


  const currentResId = route.match.params.id;
  useEffect(() => {
    const respuestaId = currentResId;
    const selectedData = respuestas.find(
      (currentRespuestaTraversal) =>
        currentRespuestaTraversal.id === parseInt(respuestaId)
    );
    console.log(selectedData);
    setDatos(selectedData);
  }, [currentResId, respuestas]);
  useEffect(() => {
    async function fetchData() {
      const peticion = await fetch(`${url}preguntas/`, {
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      const objeto = await peticion.json();
      await setDataPre(objeto);
    }
    fetchData();
  }, []);


  const onSubmit = (e) => {
    e.preventDefault();
    editarRespuesta(datos);
    history.push("/respuestas");
  };

  const handleOnChange = (userKey, newValue) =>
    setDatos({ ...datos, [userKey]: newValue });

  if (!datos || !datos.id) {
    return <div className="text-center alert alert-danger">ID invalido.</div>;
  }

 

  return (
    <div className="mt-5">
      <h1 className="alert alert-success text-center container">
        Actualice Respuestas
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
              placeholder="Descripcion"
            />
          </div>
          <div className="form-group mx-sm-3">
            <select
              type="text"
              name="correcta"
              value={datos.correcta}
              onChange={(e) => handleOnChange("correcta", e.target.value)}
              className="form-control"
              placeholder="Correcta / Si o No ?"
            >
              <option>Si</option>
              <option>No</option>
            </select>
          </div>
          <div className="form-group mx-sm-3">
            <select
              className="form-control"
              name="respuesta"
              value={datos.respuesta}
              onChange={(e) => handleOnChange("respuesta", e.target.value)}
            >
              <option>¿Pregunta? </option>
              {dataPre.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.descripcion}
                </option>
              ))}
            </select>
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
          <div className="text-center text-danger-500 mt-4 text-gray-500">
            <Link to="/respuestas">Cancelar</Link>
          </div>
        </form>
      </div>

      {/* <ListaRespuestas /> */}
    </div>
  );
};

export default ActualizarRespuestas;
