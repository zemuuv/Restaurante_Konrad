import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
