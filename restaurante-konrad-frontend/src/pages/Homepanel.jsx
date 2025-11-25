import "./Homepanel.css";
import { Link } from "react-router-dom";

export default function HomePanel() {
  return (
    <div className="homepanel-wrapper">
      <div className="homepanel-card">
        <h1 className="homepanel-title">
          Bienvenido al Panel del Restaurante Konrad 🍽️
        </h1>

        <p className="homepanel-subtitle">
          Selecciona una opción del menú a la izquierda.
        </p>

      

        <Link to="/panel/platos" className="homepanel-button">
          🍕 Ver menú del día
        </Link>
      </div>
    </div>
  );
}
