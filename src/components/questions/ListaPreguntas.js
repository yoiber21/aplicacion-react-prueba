import { useContext } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../../assets/css/tabla.css";
import QuestionContext from "./context/QuestionContext";

const ListaPreguntas = () => {
  const questionContext = useContext(QuestionContext);
  const { preguntas, eliminarPreguntas } = questionContext;

  return (
    <div className="container">
      {preguntas.length > 0 ? (
        <div id="main-container">
          <h1 className="alert alert-success text-center container">
            Lista de Respuestas
          </h1>
          <table>
            <thead>
              <tr>
                <th>pregunta</th>
                <th colSpan="2" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            {preguntas.map((datos) => (
              <tr key={datos.id}>
                <td>{datos.descripcion}</td>
                <td
                  onClick={() => eliminarPreguntas(datos.id)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faTrash} />
                </td>
                <td style={{ cursor: "pointer", color: "blue" }}>
                  {" "}
                  
                  <Link
                    to={`/editar/${datos.id}`}
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

export default ListaPreguntas;
