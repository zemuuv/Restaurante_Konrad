import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const rol = localStorage.getItem("rol") || "Invitado";
  const mostrarOpciones = rol === "Invitado"; // Invitado ve todo

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Restaurante</h2>

      <ul className="sidebar-menu">
        {/* Inicio siempre visible */}
        <li>
          <Link to="/panel">🏠 Inicio</Link>
        </li>

        {/* Platos: ADMIN, CHEF, INVITADO */}
        {(rol === "ADMIN" || rol === "CHEF" || mostrarOpciones) && (
          <li>
            <Link to="/panel/platos">🍽 Platos</Link>
          </li>
        )}

        {/* Solicitudes de Cotización: ADMIN, CHEF, AUXILIAR, INVITADO */}
        {(rol === "ADMIN" || rol === "CHEF" || rol === "AUXILIAR" || mostrarOpciones) && (
          <li>
            <Link to="/panel/cotizaciones">🧾 Solicitudes de Cotización</Link>
          </li>
        )}

        {/* Auditorías: ADMIN, INVITADO */}
        {(rol === "ADMIN" || mostrarOpciones) && (
          <li>
            <Link to="/panel/auditorias">📊 Auditorías</Link>
          </li>
        )}

        {/* Inventarios: ADMIN, BODEGA, INVITADO */}
        {(rol === "ADMIN" || rol === "BODEGA" || mostrarOpciones) && (
          <li>
            <Link to="/panel/inventarios">📦 Inventarios</Link>
          </li>
        )}

        {/* Registrar Usuario: ADMIN, INVITADO */}
        {(rol === "ADMIN" || mostrarOpciones) && (
          <li>
            <Link to="/panel/registro">🧑‍💼 Registrar Usuario</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
