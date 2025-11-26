import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleAllowed }) {
  const rol = localStorage.getItem("rol") || "Invitado";

  // INVITADO puede ver todo
  if (rol === "Invitado") {
    return children;
  }

  if (roleAllowed && !roleAllowed.includes(rol)) {
    return <h2>⛔ Acceso denegado</h2>;
  }

  return children;
}
