import { useContext } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnswersContext from "./context/AnswersContext";
import "../../assets/css/tabla.css";
import { Link } from "react-router-dom";

const ListaRespuestas = () => {
  const answersContext = useContext(AnswersContext);
  const { respuestas, eliminarRespuestas } = answersContext;



  return (
    <div className="container">
      {respuestas.length > 0 ? (
        <div id="main-container">
          <h1 className="alert alert-success text-center container">
            Lista de Respuestas
          </h1>
          <table>
            <thead>
              <tr>
                <th>Respuesta</th>
                <th>Correcta</th>
                <th>Pregunta</th>
                <th colSpan="2" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            {respuestas.map((datos) => (
              <tr key={datos.id}>
                <td>{datos.descripcion}</td>
                <td>{datos.correcta}</td>
                <td>{datos.respuesta}</td>
                <td
                  onClick={() => eliminarRespuestas(datos.id)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faTrash} />
                </td>
                <td style={{ cursor: "pointer", color: "blue" }}>
                  {" "}
                  
                  <Link
                    to={`/respuestas/editar/${datos.id}`}
                  >
                      <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <h4 className="text-center bg-gray-100 text-gray-500 py-5 alert alert-warning">
          No hay datos.
        </h4>
      )}
    </div>
  );
};

export default ListaRespuestas;
