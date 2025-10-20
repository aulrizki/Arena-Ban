import React, { useState, useEffect } from "react";
import BarangTable from "../components/BarangTable";
import BarangDialog from "../components/BarangDialog";
import api from "../services/api";

export default function VelgPage() {
  const [barang, setBarang] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingBarang, setEditingBarang] = useState(null);

  const fetchBarang = async () => {
    try {
      const res = await api.get("/barang?kategori=velg");
      setBarang(res.data);
    } catch (err) {
      console.error("Gagal memuat data velg:", err);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingBarang) {
        await api.put(`/barang/${editingBarang.id}`, formData);
      } else {
        await api.post("/barang", { ...formData, kategori: "velg" });
      }
      fetchBarang();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
    }
    setShowDialog(false);
    setEditingBarang(null);
  };

  const handleDelete = async (id) => {
    await api.delete(`/barang/${id}`);
    fetchBarang();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Velg</h1>
        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Tambah Velg
        </button>
      </div>

      <BarangTable data={barang} onEdit={setEditingBarang} onDelete={handleDelete} />

      {showDialog && (
        <BarangDialog
          onClose={() => setShowDialog(false)}
          onSave={handleSave}
          initialData={editingBarang}
        />
      )}
    </div>
  );
}
