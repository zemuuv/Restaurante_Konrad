import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cambia esta URL por la del backend en Java
      const res = await axios.post("http://localhost:8080/api/login", {
        usuario,
        password,
      });
      if (res.data.success) {
        setMensaje("✅ Acceso concedido. Bienvenido " + usuario);
        // Aquí podrías usar react-router, esto es una redirección simple:
        window.location.href = "/menu";
      } else {
        setMensaje("❌ Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setMensaje("⚠️ Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>🍽️ Restaurante Konrad</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">Iniciar sesión</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}
