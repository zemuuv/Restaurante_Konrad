import { useState } from "react";
import axios from "axios";

export default function Registro() {
  const rol = localStorage.getItem("rol");

  if (rol !== "Admin") {
    return <h2>⛔ No tienes permisos para crear usuarios</h2>;
  }

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [rolNuevo, setRolNuevo] = useState("Mesero");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/SingUp", {
        usuario,
        password,
        rol: rolNuevo,
      });

      setMensaje("✅ Usuario registrado correctamente");
      setUsuario("");
      setPassword("");
    } catch (error) {
      setMensaje("⚠️ Error al registrar usuario");
    }
  };

  return (
    <div className="registro-container">
      <h2>Registrar usuario nuevo</h2>

      <form className="registro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={rolNuevo} onChange={(e) => setRolNuevo(e.target.value)}>
          <option>Admin</option>
          <option>Mesero</option>
          <option>Cocina</option>
          <option>Caja</option>
        </select>

        <button type="submit">Crear usuario</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}
