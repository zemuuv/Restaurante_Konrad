import "./Homepanel.css";
import { Link } from "react-router-dom";

export default function HomePanel() {
  const rol = (localStorage.getItem("rol") || "Invitado").toUpperCase();

  return (
    <div className="homepanel-wrapper">
      <div className="homepanel-card">
        <h1 className="homepanel-title">
          Bienvenido al Panel del Restaurante Konrad 🍽️
        </h1>

        <p className="homepanel-subtitle">
          Selecciona una opción del menú a la izquierda.
        </p>

        {/* BOTONES SEGÚN ROL */}
        {["ADMIN", "CHEF"].includes(rol) && (
          <Link to="/panel/platos" className="homepanel-button">
            🍕 Ver menú del día
          </Link>
        )}

        {["ADMIN", "CHEF", "AUXILIAR"].includes(rol) && (
          <Link to="/panel/cotizaciones" className="homepanel-button">
            🧾 Solicitudes de Cotización
          </Link>
        )}

        {["ADMIN"].includes(rol) && (
          <>
            <Link to="/panel/auditorias" className="homepanel-button">
              📊 Auditorías
            </Link>
            <Link to="/panel/registro" className="homepanel-button">
              🧑‍💼 Registrar usuario
            </Link>
          </>
        )}

        {["ADMIN", "BODEGA"].includes(rol) && (
          <Link to="/panel/inventarios" className="homepanel-button">
            📦 Inventarios
          </Link>
        )}
      </div>
    </div>
  );
}