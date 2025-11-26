import { useEffect, useState } from "react";
import axios from "axios";
import "./SolicitudCotizacion.css";

export default function SolicitudCotizacion() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [form, setForm] = useState({ titulo: "", descripcion: "" });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarSolicitudes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/solicitud/listar");
      setSolicitudes(res.data);
    } catch (err) {
      console.error("Error cargando solicitudes", err);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/solicitud/actualizar/${editId}`, form);
        setMensaje("Solicitud actualizada correctamente");
      } else {
        await axios.post("http://localhost:8080/solicitud/crear", form);
        setMensaje("Solicitud creada correctamente");
      }

      setForm({ titulo: "", descripcion: "" });
      setEditId(null);
      cargarSolicitudes();
    } catch (error) {
      console.error(error);
      setMensaje("Error guardando la solicitud");
    }
  };

  const editar = (sol) => {
    setForm({
      titulo: sol.titulo,
      descripcion: sol.descripcion,
    });
    setEditId(sol.id);
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta solicitud?")) return;

    await axios.delete(`http://localhost:8080/solicitud/eliminar/${id}`);
    cargarSolicitudes();
  };

  return (
    <div className="solicitud-container">
      <h1>Solicitudes de Cotización 🧾</h1>

      <form className="solicitud-form" onSubmit={guardar}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">
          {editId ? "Actualizar" : "Registrar"}
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <table className="solicitud-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No hay solicitudes registradas.
              </td>
            </tr>
          ) : (
            solicitudes.map((s) => (
              <tr key={s.id}>
                <td>{s.titulo}</td>
                <td>{s.descripcion}</td>
                <td>
                  <button onClick={() => editar(s)} className="btn-edit">✏️</button>
                  <button onClick={() => eliminar(s.id)} className="btn-delete">🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
