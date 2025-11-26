import { useEffect, useState } from "react";
import axios from "axios";
import "./inventario.css";

export default function Inventarios() {
  const [inventario, setInventario] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editId, setEditId] = useState(null);
  const [editPlatoIndex, setEditPlatoIndex] = useState(null);

  // ======================
  // CARGAR INVENTARIO
  // ======================
  const cargarInventario = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventario");
      setInventario([res.data]); // <-- CORRECCIÓN CLAVE
    } catch (error) {
      console.log(error);
      setMensaje("⚠ Error cargando inventario");
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  // ======================
  // CREAR O ACTUALIZAR PLATO
  // ======================
  const guardarPlato = async (e) => {
    e.preventDefault();

    const plato = { nombre, cantidad, precio };

    try {
      if (editId !== null && editPlatoIndex !== null) {
        // EDITAR PLATO EXISTENTE
        const inv = inventario.find((i) => i.id_Inventario === editId);
        inv.platos[editPlatoIndex] = plato;

        await axios.put(`http://localhost:8080/api/inventario/${editId}`, inv);
        setMensaje("✅ Plato actualizado correctamente");
      } else {
        // AGREGAR PLATO (BACKEND YA LO MANEJA)
        await axios.post("http://localhost:8080/api/inventario", plato); // <-- CORREGIDO
        setMensaje("✅ Plato agregado al inventario");
      }

      // Limpiar form
      setNombre("");
      setCantidad("");
      setPrecio("");
      setEditId(null);
      setEditPlatoIndex(null);

      cargarInventario();
    } catch (error) {
      console.log(error);
      setMensaje("⚠ Error al guardar plato");
    }
  };

  // ======================
  // CARGAR PLATO PARA EDITAR
  // ======================
  const editarPlato = (inventarioId, plato, index) => {
    setEditId(inventarioId);
    setEditPlatoIndex(index);
    setNombre(plato.nombre);
    setCantidad(plato.cantidad);
    setPrecio(plato.precio);
  };

  // ======================
  // ELIMINAR PLATO
  // ======================
  const eliminarPlato = async (inventarioId, index) => {
    if (!confirm("¿Seguro que deseas eliminar este plato?")) return;

    try {
      const inv = inventario.find((i) => i.id_Inventario === inventarioId);
      inv.platos.splice(index, 1);

      if (inv.platos.length === 0) {
        await axios.delete(`http://localhost:8080/api/inventario/${inventarioId}`);
        setMensaje("🗑 Inventario eliminado");
      } else {
        await axios.put(`http://localhost:8080/api/inventario/${inventarioId}`, inv);
        setMensaje("🗑 Plato eliminado");
      }

      cargarInventario();
    } catch (error) {
      console.log(error);
      setMensaje("⚠ Error eliminando plato");
    }
  };

  return (
    <div className="container">
      <h1>📦 Gestión de Inventarios</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* FORMULARIO */}
      <form onSubmit={guardarPlato} className="formulario">
        <input
          type="text"
          placeholder="Nombre del plato"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit">{editId !== null ? "Actualizar Plato" : "Agregar Plato"}</button>
      </form>

      {/* TABLA */}
      <table className="tabla">
        <thead>
          <tr>
            <th>ID Inventario</th>
            <th>Plato</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {inventario.length === 0 ? (
            <tr>
              <td colSpan="5">No hay registros</td>
            </tr>
          ) : (
            inventario.map((inv) =>
              inv.platos.map((plato, index) => (
                <tr key={inv.id_Inventario + index}>
                  <td>{inv.id_Inventario}</td>
                  <td>{plato.nombre}</td>
                  <td>{plato.cantidad}</td>
                  <td>${plato.precio}</td>
                  <td>
                    <button onClick={() => editarPlato(inv.id_Inventario, plato, index)}>
                      Editar
                    </button>
                    <button onClick={() => eliminarPlato(inv.id_Inventario, index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
