import { useEffect, useReducer } from "react";
import Swal from "sweetalert2";
import { url } from "../../../config/variables";
import { EDIT_PREGUNTA, REMOVE_PREGUNTA } from "../../../types";
import QuestionContext from "./QuestionContext";
import QuestionReducer from "./QuestionReducer";

const QuestionState = (props) => {
  const questionState = {
    preguntas: "",
  };

  const [state, dispatch] = useReducer(QuestionReducer, questionState);

  useEffect(() => {
    async function fetchData() {
      const peticion = await fetch(`${url}preguntas/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
      });
      const objeto = await peticion.json();
      state.preguntas = objeto;
      console.log(objeto);
    }
    fetchData();
  }, []);

  const registrarPreguntas = async (preguntas) => {
    const peticion = await fetch(`${url}preguntas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(preguntas),
    });
    const objeto = await peticion.json();
    dispatch({
      type: "ENVIADODATOS",
      cargando: true,
      payload: JSON.stringify(preguntas),
      preguntas: state.preguntas,
      peticion: state.peticion,
      registrarPreguntas,
    });

    //   console.log(state.preguntas);
  };

  const eliminarPreguntas = async (id) => {
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
        fetch(`${url}preguntas/${id}`, {
          method: "DELETE",
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              dispatch({
                type: REMOVE_PREGUNTA,
                payload: id,
              });
            }
            if (!data.error) {
              Swal.fire(
                "¡Eliminada!",
                "La pregunta ha sido eliminada.",
                "success"
              );
            } else {
              Swal.fire({
                icon: "error",
                title: "error",
                text: `${data.message}`,
              });
            }
            console.log(data);
          });
      }
    });
  };

  const editarPreguntas = async (pregunta) => {
    const peticion = await fetch(`${url}preguntas/${pregunta.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(pregunta),
    });
    const objeto = await peticion.json();
    if (!objeto.error) {
      dispatch({
        type: EDIT_PREGUNTA,
        payload: pregunta,
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
    console.log(objeto);
  };

  return (
    <QuestionContext.Provider
      value={{
        cargando: state.cargando,
        preguntas: state.preguntas,
        peticion: state.peticion,
        registrarPreguntas,
        eliminarPreguntas,
        editarPreguntas,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
