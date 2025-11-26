import { useEffect, useState } from "react";
import "./auditorias.css";

export default function ListarAuditorias() {
  const [auditorias, setAuditorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Estados para crear nueva auditoría
  const [fecha, setFecha] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Cargar auditorías existentes
  const cargarAuditorias = async () => {
    try {
      const res = await fetch("http://localhost:8080/auditorias/listar");
      const data = await res.json();
      setAuditorias(data);
    } catch (error) {
      setMensaje("⚠ Error cargando auditorías");
    }
  };

  useEffect(() => {
    cargarAuditorias();
  }, []);

  // Crear nueva auditoría
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!fecha || !titulo || !descripcion) {
      setMensaje("⚠ Completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auditorias/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha, titulo, descripcion }),
      });

      if (res.ok) {
        setMensaje("✅ Auditoría creada correctamente");
        setFecha("");
        setTitulo("");
        setDescripcion("");
        cargarAuditorias();
      } else {
        setMensaje("⚠ Error al crear auditoría");
      }
    } catch (error) {
      setMensaje("⚠ Error al conectar con el servidor");
    }
  };

  // Eliminar auditoría
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta auditoría?")) return;

    try {
      const res = await fetch(`http://localhost:8080/auditorias/eliminar/${id}`, {
        method: "DELETE",
      });

      const msg = await res.text();
      setMensaje(msg);
      cargarAuditorias();
    } catch (error) {
      setMensaje("⚠ Error al eliminar auditoría");
    }
  };

  return (
    <div className="contenedor-auditorias">
      <h1>📋 Auditorías del Sistema</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* Formulario para crear auditoría */}
      <form className="form-auditoria" onSubmit={handleCrear}>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <button type="submit">➕ Crear Auditoría</button>
      </form>

      {/* Tabla de auditorías */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {auditorias.length === 0 ? (
            <tr>
              <td colSpan="5">No hay registros</td>
            </tr>
          ) : (
            auditorias.map((audi) => (
              <tr key={audi.id}>
                <td>{audi.id}</td>
                <td>{audi.fecha}</td>
                <td>{audi.titulo}</td>
                <td>{audi.descripcion}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(audi.id)}
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
