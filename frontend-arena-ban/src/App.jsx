import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Merk from "./pages/Merk";
import Barang from "./pages/Barang";
import Stok from "./pages/Stok"


function App() {
  return (
    <Router>
      <Routes>
        {/* Semua halaman dibungkus MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/merk" element={<Merk />} />
          <Route path="/barang" element={<Barang />} />
          <Route path="/stok/:id" element={<Stok />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
