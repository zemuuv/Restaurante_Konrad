import { Link } from "react-router-dom";
import "./Navbar.css"; // Asegúrate de tener estilos

export default function Navbar() {
  const rol = localStorage.getItem("rol") || "Invitado";

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h3>Restaurante Konrad</h3>

      <ul>
        {rol === "ADMIN" && (
          <>
            <li><Link to="/panel/registro">🧑‍💼 Usuarios</Link></li>
            <li><Link to="/panel/auditorias">📊 Auditoría</Link></li>
            <li><Link to="/panel/inventarios">📦 Inventarios</Link></li>
            <li><Link to="/panel/platos">🍽 Platos</Link></li>
            <li><Link to="/panel/cotizaciones">🧾 Cotizaciones</Link></li>
          </>
        )}

        {rol === "CHEF" && (
          <>
            <li><Link to="/panel/platos">🍽 Platos</Link></li>
            <li><Link to="/panel/cotizaciones">🧾 Cotizaciones</Link></li>
          </>
        )}

        {rol === "AUXILIAR" && (
          <li><Link to="/panel/cotizaciones">🧾 Cotizaciones</Link></li>
        )}

        {rol === "BODEGA" && (
          <li><Link to="/panel/inventarios">📦 Inventarios</Link></li>
        )}

        {rol === "CAJA" && (
          <li><Link to="/panel/caja">💰 Caja</Link></li>
        )}

        {rol === "MESERO" && (
          <li><Link to="/panel/mesas">🪑 Mesas</Link></li>
        )}
      </ul>

      <button className="logout-button" onClick={logout}>
        Cerrar sesión
      </button>
    </nav>
  );
}
