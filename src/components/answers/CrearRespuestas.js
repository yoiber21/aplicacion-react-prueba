import { useContext, useEffect, useState } from "react";
import { url } from "../../config/variables";
import Swal from "sweetalert2";
import UseForm from "../../hooks/UseForm";
import AnswersContext from "./context/AnswersContext";
import ListaRespuestas from "./ListaRespuestas";

const CrearRespuestas = () => {
  const [dataPre, setDataPre] = useState([]);

  const answersContext = useContext(AnswersContext);
  const { cargando, registrarRespuesta } = answersContext;

  const [datos, handleInputChange, clear] = UseForm({
    descripcion: "",
    respuesta: "",
    correcta: "",
  });

  const onSubmitt = async (_) => {
    _.preventDefault();
    if (
        datos.descripcion.trim().length <= 1 ||
        datos.correcta.trim().length <= 1 ||
        datos.respuesta === "¿Pregunta?"
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
        await registrarRespuesta(datos);
        clear();
      }
  };

  useEffect(() => {
   async function fetchData(){
    const peticion = await fetch(`${url}preguntas/`, {
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      const objeto = await peticion.json();
      await setDataPre(objeto);
   }
   fetchData()
  }, []);

  return (
    <div className="mt-5">
      <h1 className="alert alert-success text-center container">
        Crear Respuestas
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
              placeholder="Descripcion"
            />
          </div>
          <div className="form-group mx-sm-3">
            <select
              type="text"
              name="correcta"
              value={datos.correcta}
              onChange={(e) => handleInputChange(e)}
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
              onChange={(e) => handleInputChange(e)}
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
              onClick={(e) => onSubmitt(e)}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <ListaRespuestas />
    </div>
  );
};

export default CrearRespuestas;
