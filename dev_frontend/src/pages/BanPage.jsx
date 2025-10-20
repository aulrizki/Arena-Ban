// pages/BanPage.js
import React, { useState, useEffect } from "react";
import BarangTable from "../components/BarangTable";
import BarangDialog from "../components/BarangDialog";
import { mockStockHistory } from "../data/mockStockHistory";
import { calculateCurrentStock } from "../utils/stockCalculator";

export default function BanPage() {
  const [barang, setBarang] = useState([
    { id: 1, merk: "Bridgestone", tipe: "Turanza", jenis: "Ban", harga_modal: 500000 },
    { id: 4, merk: "Michelin", tipe: "Pilot Sport", jenis: "Ban", harga_modal: 800000 },
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [editingBarang, setEditingBarang] = useState(null);

  // Update stok barang berdasarkan history
  const updateBarangStock = () => {
    const updatedBarang = barang.map(item => ({
      ...item,
      stok: calculateCurrentStock(item.id, mockStockHistory)
    }));
    setBarang(updatedBarang);
  };

  // Update stok ketika komponen mount atau mockStockHistory berubah
  useEffect(() => {
    updateBarangStock();
  }, []);

  const handleSave = (formData) => {
    if (editingBarang) {
      // Edit existing barang
      setBarang(barang.map(item => 
        item.id === editingBarang.id 
          ? { ...formData, id: editingBarang.id }
          : item
      ));
    } else {
      // Add new barang
      const newBarang = {
        ...formData,
        id: Math.max(...barang.map(b => b.id)) + 1
      };
      setBarang([...barang, newBarang]);
    }
    setShowDialog(false);
    setEditingBarang(null);
  };

  const handleEdit = (barang) => {
    setEditingBarang(barang);
    setShowDialog(true);
  };

  const handleDelete = (id) => {
    setBarang(barang.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Ban</h1>
        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Tambah Ban
        </button>
      </div>

      <BarangTable 
        data={barang} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {showDialog && (
        <BarangDialog
          onClose={() => {
            setShowDialog(false);
            setEditingBarang(null);
          }}
          onSave={handleSave}
          initialData={editingBarang}
        />
      )}
    </div>
  );
}