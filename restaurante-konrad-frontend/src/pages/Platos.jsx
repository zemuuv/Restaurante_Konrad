import { useEffect, useState } from "react";
import axios from "axios";
import "./Platos.css";

export default function Platos() {
  const [platos, setPlatos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
  });
  const [mensaje, setMensaje] = useState("");

  // =============================
  //  CARGAR LISTA DE PLATOS
  // =============================
  const cargarPlatos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/menu/listar");
      if (res.data && res.data.platos) {
        setPlatos(res.data.platos);
      } else {
        setPlatos([]);
      }
    } catch (err) {
      console.error("Error cargando platos:", err);
    }
  };

  useEffect(() => {
    cargarPlatos();
  }, []);

  // =============================
  // MANEJAR INPUTS
  // =============================
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // =============================
  // GUARDAR PLATO
  // =============================
  const guardarPlato = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/agregarPlato", {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        cantidad: parseFloat(form.cantidad),
      });

      setMensaje("Plato registrado correctamente");
      setForm({ nombre: "", precio: "", cantidad: "" });
      cargarPlatos();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al registrar el plato");
    }
  };

  return (
    <div className="platos-container">
      <h1>Gestión de Platos 🍽️</h1>

      <form className="platos-form" onSubmit={guardarPlato}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del plato"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Plato</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* =============================
          TABLA DE PLATOS
      ============================= */}
      <table className="platos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio ($)</th>
            <th>Cantidad</th>
          </tr>
        </thead>

        <tbody>
          {platos.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No hay platos registrados.
              </td>
            </tr>
          ) : (
            platos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.cantidad}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
