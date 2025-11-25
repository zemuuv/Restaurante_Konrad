import "./Header.css";

export default function Header() {
  const rol = localStorage.getItem("rol") || "Invitado";

  return (
    <header className="header">
      <div className="header-left">
        <h3>Panel Administrativo</h3>
      </div>

      <div className="header-right">
        <span>👤 Rol: {rol}</span>
      </div>
    </header>
  );
}
