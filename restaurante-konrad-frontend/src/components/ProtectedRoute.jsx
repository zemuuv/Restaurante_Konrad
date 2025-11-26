import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleAllowed }) {
  const rol = (localStorage.getItem("rol") || "Invitado").toUpperCase();

  // INVITADO puede ver todo
  if (rol === "INVITADO") {
    return children;
  }

  // Normalizamos roleAllowed a mayúsculas también
  if (roleAllowed && !roleAllowed.map(r => r.toUpperCase()).includes(rol)) {
    return <h2>⛔ Acceso denegado</h2>;
  }

  return children;
}

