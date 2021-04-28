import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActualizarRespuestas from "./components/answers/ActualizarRespuestas";
import AnswersState from "./components/answers/context/AnswersState";
import CrearRespuestas from "./components/answers/CrearRespuestas";
import ActualizarPreguntas from "./components/questions/ActualizarPreguntas";
import QuestionState from "./components/questions/context/QuestionState";
import CrearPreguntas from "./components/questions/CrearPreguntas";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <>
    <QuestionState>
      <AnswersState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={CrearPreguntas} />
            <Route exact path="/respuestas" component={CrearRespuestas} />
            <Route exact path="/respuestas/editar/:id" component={ActualizarRespuestas} />
            <Route exact path="/editar/:id" component={ActualizarPreguntas} />
            <Route exact path="*" status={404} />
          </Switch>
        </Router>
      </AnswersState>
      </QuestionState>
    </>
  );
};

export default App;
