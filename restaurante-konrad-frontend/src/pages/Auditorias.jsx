import { useEffect, useState } from "react";
import "./auditorias.css";

export default function ListarAuditorias() {
  const [auditorias, setAuditorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargarAuditorias = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auditorias");
      const data = await res.json();
      setAuditorias(data);
    } catch (error) {
      setMensaje("⚠ Error cargando auditorías");
    }
  };

  useEffect(() => {
    cargarAuditorias();
  }, []);

  return (
    <div className="contenedor-auditorias">
      <h1>📋 Auditorías del Sistema</h1>

      {mensaje && <p>{mensaje}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {auditorias.length === 0 ? (
            <tr>
              <td colSpan="4">No hay registros</td>
            </tr>
          ) : (
            auditorias.map((audi) => (
              <tr key={audi.id}>
                <td>{audi.id}</td>
                <td>{audi.usuario}</td>
                <td>{audi.accion}</td>
                <td>{audi.fecha}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
