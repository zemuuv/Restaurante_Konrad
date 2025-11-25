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
      const res = await axios.post("http://localhost:8080/LogIn", {
        usuario,
        password,
      });

      if (res.data === "Credenciales inválidas") {
        setMensaje("❌ Usuario o contraseña incorrectos");
        return;
      }

      // guardar rol en localStorage
      localStorage.setItem("rol", res.data);

      setMensaje("✅ Bienvenido " + usuario);

      window.location.href = "/panel";
    } catch (error) {
      console.log(error);
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
