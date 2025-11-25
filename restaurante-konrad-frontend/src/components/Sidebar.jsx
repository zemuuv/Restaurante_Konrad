import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Restaurante</h2>

      <ul className="sidebar-menu">
        <li>
          <Link to="/panel">🏠 Inicio</Link>
        </li>

       
      </ul>
    </div>
  );
}
