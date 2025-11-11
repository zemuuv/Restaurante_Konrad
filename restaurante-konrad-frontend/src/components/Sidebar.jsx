import { Link } from "react-router-dom";
import "../styles/menu.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🍽️ Konrad</h2>
      <ul>
        <li><Link to="/menu">🏠 Inicio</Link></li>
        <li><Link to="/platos">📋 Platos</Link></li>
        <li><Link to="/pedidos">🧾 Pedidos</Link></li>
        <li><Link to="/clientes">👥 Clientes</Link></li>
        <li><Link to="/reportes">📊 Reportes</Link></li>
      </ul>
      <button className="logout-btn" onClick={() => window.location.href = "/"}>
        🔓 Cerrar sesión
      </button>
    </div>
  );
}
