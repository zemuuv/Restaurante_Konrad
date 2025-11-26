import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/menu.css";

export default function Menu() {
  const rol = localStorage.getItem("rol") || "Invitado";

  return (
    <div className="menu-container">
      <Sidebar />
      <div className="menu-content">
        <Header />
        <div className="menu-body">
          <h2>Bienvenido al Panel del Restaurante Konrad 🍽️</h2>
          <p>Selecciona una opción del menú para comenzar.</p>

          <div className="menu-cards">
            {/* ADMIN y CHEF */}
            {["ADMIN", "CHEF"].includes(rol) && (
              <div className="card">
                <h3>📋 Platos</h3>
                <p>Gestiona los platos disponibles en el restaurante.</p>
              </div>
            )}

            {/* ADMIN y COCINA */}
            {["ADMIN", "COCINA"].includes(rol) && (
              <div className="card">
                <h3>🧾 Pedidos</h3>
                <p>Registra y consulta los pedidos realizados.</p>
              </div>
            )}

            {/* ADMIN */}
            {["ADMIN"].includes(rol) && (
              <>
                <div className="card">
                  <h3>👥 Clientes</h3>
                  <p>Administra la información de los clientes.</p>
                </div>
                <div className="card">
                  <h3>📊 Reportes</h3>
                  <p>Visualiza estadísticas y reportes de ventas.</p>
                </div>
              </>
            )}

            {/* BODEGA */}
            {["BODEGA"].includes(rol) && (
              <div className="card">
                <h3>📦 Inventarios</h3>
                <p>Gestiona el inventario de insumos y productos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
