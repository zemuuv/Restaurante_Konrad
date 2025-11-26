import { useEffect, useState } from "react";
import "./inventario.css";
import axios from "axios";

export default function Inventarios() {
  const [inventario, setInventario] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editId, setEditId] = useState(null);

  // CARGAR INVENTARIO
  const cargarInventario = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventario");
      setInventario(res.data);
    } catch (error) {
      setMensaje("⚠ Error cargando inventario");
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  // CREAR O ACTUALIZAR PRODUCTO
  const guardarProducto = async (e) => {
    e.preventDefault();

    const data = { nombre, cantidad, precio };

    try {
      if (editId) {
        // -------- ACTUALIZAR --------
        await axios.put(`http://localhost:8080/api/inventario/${editId}`, data);
        setMensaje("✅ Producto actualizado correctamente");
      } else {
        // -------- CREAR --------
        await axios.post("http://localhost:8080/api/inventario", data);
        setMensaje("✅ Producto agregado al inventario");
      }

      setNombre("");
      setCantidad("");
      setPrecio("");
      setEditId(null);
      cargarInventario();

    } catch (error) {
      setMensaje("⚠ Error al guardar el producto");
    }
  };

  // CARGAR PRODUCTO PARA EDITAR
  const editarProducto = (item) => {
    setEditId(item.id);
    setNombre(item.nombre);
    setCantidad(item.cantidad);
    setPrecio(item.precio);
  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/inventario/${id}`);
      setMensaje("🗑 Producto eliminado");
      cargarInventario();
    } catch (error) {
      setMensaje("⚠ Error eliminando el producto");
    }
  };

  return (
    <div className="container">
      <h1>📦 Gestión de Inventarios</h1>

      {mensaje && <p>{mensaje}</p>}

      {/* FORMULARIO */}
      <form onSubmit={guardarProducto} className="formulario">
        <input
          type="text"
          placeholder="Nombre del producto"
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

        <button type="submit">
          {editId ? "Actualizar" : "Agregar producto"}
        </button>
      </form>

      {/* TABLA */}
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {inventario.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio}</td>
              <td>
                <button onClick={() => editarProducto(item)}>Editar</button>
                <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
