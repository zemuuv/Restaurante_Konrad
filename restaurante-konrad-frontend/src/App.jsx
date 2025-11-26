import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";

import HomePanel from "./pages/Homepanel";
import Platos from "./pages/Platos";
import SolicitudCotizacion from "./pages/SolicitudCotizacion";
import Auditorias from "./pages/Auditorias";
import Inventarios from "./pages/Inventarios";
import Registro from "./pages/Registro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* REGISTRO -> será la primera página */}
        <Route path="/" element={<Registro />} />

        {/* LOGIN -> accesible desde registro */}
        <Route path="/login" element={<Login />} />

        {/* PANEL */}
        <Route element={<DashboardLayout />}>

          <Route path="/panel" element={<HomePanel />} />

          {/* SOLO ADMIN */}
          <Route
            path="/panel/registro"
            element={
              <ProtectedRoute roleAllowed={["ADMIN"]}>
                <Registro />
              </ProtectedRoute>
            }
          />

          {/* ADMIN Y CHEF */}
          <Route
            path="/panel/platos"
            element={
              <ProtectedRoute roleAllowed={["ADMIN", "CHEF"]}>
                <Platos />
              </ProtectedRoute>
            }
          />

          {/* ADMIN, CHEF Y AUXILIAR */}
          <Route
            path="/panel/cotizaciones"
            element={
              <ProtectedRoute roleAllowed={["ADMIN", "CHEF", "AUXILIAR"]}>
                <SolicitudCotizacion />
              </ProtectedRoute>
            }
          />

          {/* SOLO ADMIN */}
          <Route
            path="/panel/auditorias"
            element={
              <ProtectedRoute roleAllowed={["ADMIN"]}>
                <Auditorias />
              </ProtectedRoute>
            }
          />

          {/* ADMIN Y BODEGA */}
          <Route
            path="/panel/inventarios"
            element={
              <ProtectedRoute roleAllowed={["ADMIN", "BODEGA"]}>
                <Inventarios />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
