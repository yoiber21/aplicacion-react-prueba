import { useEffect, useReducer } from "react";
import { url } from "../../../config/variables";
import AnswersContext from "./AnswersContext";
import AnswersReducer from "./AnswersReducer";
import Swal from "sweetalert2";
import { EDIT_RESPUESTAS, REMOVE_RESPUESTAS } from "../../../types";

const AnswersState = (props) => {
  const answersState = {
    respuestas: "",
  };

  const [state, dispatch] = useReducer(AnswersReducer, answersState);

  useEffect(() => {
    async function fetchData() {
      const peticion = await fetch(`${url}respuestas/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
      });
      const objeto = await peticion.json();

      state.respuestas = objeto;
      console.log(state.respuestas);
    }
    fetchData();
  }, []);
  const registrarRespuesta = async (respuestas) => {
    console.log(JSON.stringify(respuestas));
    const peticion = await fetch(`${url}respuestas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(respuestas),
    });
    const objeto = await peticion.json();
    console.log(objeto);
    localStorage.setItem("token", objeto.token);

    dispatch({
      type: "ENVIADODATOS",
      cargando: true,
      payload: JSON.stringify(respuestas),
      respuesta: state.respuestas,
      registrarRespuesta,
    });
  };

  const eliminarRespuestas = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}respuestas/${id}`, {
          method: "DELETE",
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              dispatch({
                type: REMOVE_RESPUESTAS,
                payload: id,
              });
              Swal.fire(
                "¡Eliminada!",
                "La respuesta ha sido eliminada.",
                "success"
              );
            } else {
              Swal.fire({
                icon: "error",
                title: "error",
                text: `${data.message}`,
              });
            }
          });
      }
    });
  };

  const editarRespuesta = async (respuesta) => {
    const peticion = await fetch(`${url}respuestas/${respuesta.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(respuesta),
    });
    const objeto = await peticion.json();
    console.log(objeto);

    if (!objeto.error) {
      dispatch({
        type: EDIT_RESPUESTAS,
        payload: respuesta,
      });
      Swal.fire({
        icon: "success",
        title: "Perfecto",
        text: `${objeto.message}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${objeto.message}`,
      });
    }
  };

  return (
    <AnswersContext.Provider
      value={{
        cargando: state.cargando,
        respuestas: state.respuestas,
        peticion: state.peticion,
        registrarRespuesta,
        eliminarRespuestas,
        editarRespuesta,
      }}
    >
      {props.children}
    </AnswersContext.Provider>
  );
};

export default AnswersState;
