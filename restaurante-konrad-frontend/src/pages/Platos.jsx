import { useEffect, useState } from "react";
import axios from "axios";
import "./Platos.css";

export default function Platos() {
  const [platos, setPlatos] = useState([]);
  const [form, setForm] = useState({ nombre: "", precio: "", cantidad: "" });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Cargar platos desde la base de datos
  const cargarPlatos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/menu/listar");
      setPlatos(res.data || []);
    } catch (err) {
      console.error("Error cargando platos:", err);
      setMensaje("⚠ Error cargando platos");
    }
  };

  useEffect(() => {
    cargarPlatos();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Guardar o actualizar plato
  const guardarPlato = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8080/platos/${editId}`, {
          nombre: form.nombre,
          precio: parseFloat(form.precio),
          cantidad: parseFloat(form.cantidad),
        });
        setMensaje("✅ Plato actualizado correctamente");
      } else {
        await axios.post("http://localhost:8080/agregarPlato", {
          nombre: form.nombre,
          precio: parseFloat(form.precio),
          cantidad: parseFloat(form.cantidad),
        });
        setMensaje("✅ Plato agregado correctamente");
      }

      setForm({ nombre: "", precio: "", cantidad: "" });
      setEditId(null);
      cargarPlatos();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al guardar el plato");
    }
  };

  // Editar plato
  const editarPlato = (plato) => {
    setForm({
      nombre: plato.nombre,
      precio: plato.precio,
      cantidad: plato.cantidad,
    });
    setEditId(plato.id);
  };

  // Eliminar plato
  const eliminarPlato = async (id) => {
    if (!window.confirm("¿Deseas eliminar este plato?")) return;
    try {
      await axios.delete(`http://localhost:8080/platos/${id}`);
      setMensaje("🗑 Plato eliminado correctamente");
      cargarPlatos();
    } catch (err) {
      console.error(err);
      setMensaje("⚠ Error al eliminar el plato");
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

        <button type="submit">{editId ? "Actualizar Plato" : "Agregar Plato"}</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <table className="platos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio ($)</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {platos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No hay platos registrados.
              </td>
            </tr>
          ) : (
            platos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.cantidad}</td>
                <td>
                  <button onClick={() => editarPlato(p)}>✏️</button>
                  <button onClick={() => eliminarPlato(p.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
