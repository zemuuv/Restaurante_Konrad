import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function Menu() {
  return <h1>Bienvenido al panel del Restaurante Konrad 🍽️</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}
