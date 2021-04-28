import {Link} from "react-router-dom";
import "../assets/css/navbar.css"

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              className="logo horizontal-logo"
              src={"https://vivanticplus.com/wp-content/uploads/2017/08/juegos-preguntas-respuestas.a64c775b30b14587ae7ca36b8b6dff68.jpg"}
              alt="preguntas"
              style={{width: '80px', borderRadius: '15px'}}
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/respuestas">
                  Respuestas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Preguntas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
