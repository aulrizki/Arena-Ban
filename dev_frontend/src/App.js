import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import BanPage from "./pages/BanPage";
import VelgPage from "./pages/VelgPage";
import HistoryPage from "./pages/HistoryPage"; // Import HistoryPage

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/barang/ban" element={<BanPage />} />
          <Route path="/barang/velg" element={<VelgPage />} />
          <Route path="/history" element={<HistoryPage />} /> {/* Tambahkan route ini */}
          <Route path="/" element={<h1 className="p-6 text-2xl">Selamat Datang di Dashboard Arena Ban</h1>} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;