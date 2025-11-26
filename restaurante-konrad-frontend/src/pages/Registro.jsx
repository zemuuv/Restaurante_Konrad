import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registro.css";

export default function Registro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [rolNuevo, setRolNuevo] = useState("ADMIN"); // Rol por defecto
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/SingUp", {
        usuario,
        password,
        rol: rolNuevo,
      });

      setMensaje(`✅ Usuario ${usuario} registrado como ${rolNuevo}`);
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
          <option value="ADMIN">ADMIN</option>
          <option value="CHEF">CHEF</option>
          <option value="AUXILIAR">AUXILIAR</option>
          <option value="BODEGA">BODEGA</option>
        </select>

        <button type="submit">Crear usuario</button>
        {mensaje && <p className={mensaje.includes("✅") ? "success" : "error"}>{mensaje}</p>}
      </form>

      {/* Botón para ir al login */}
      <button className="btn-login" onClick={() => navigate("/login")}>
        Iniciar sesión
      </button>
    </div>
  );
}
