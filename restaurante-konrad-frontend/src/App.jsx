import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import HomePanel from "./pages/Homepanel";
import Platos from "./pages/Platos"; // 👈 nuevo

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* PANEL */}
        <Route element={<DashboardLayout />}>
          <Route path="/panel" element={<HomePanel />} />
          <Route path="/panel/platos" element={<Platos />} /> {/* 👈 nuevo */}
          <Route path="/panel/platos" element={<Platos />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
