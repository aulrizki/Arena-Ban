// components/StockDialog.js
import React, { useState } from "react";

export default function StockDialog({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    tipe: "masuk", // "masuk" or "keluar"
    jumlah: 0,
    stokAwal: 0,
    stokAkhir: 0,
    keterangan: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.jumlah > 0) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Calculate stokAkhir automatically based on tipe and jumlah
  const handleJumlahChange = (e) => {
    const jumlah = parseInt(e.target.value) || 0;
    const stokAwal = parseInt(formData.stokAwal) || 0;
    
    let stokAkhir = stokAwal;
    if (formData.tipe === "masuk") {
      stokAkhir = stokAwal + jumlah;
    } else {
      stokAkhir = stokAwal - jumlah;
    }

    setFormData({
      ...formData,
      jumlah: jumlah,
      stokAkhir: stokAkhir
    });
  };

  const handleTipeChange = (e) => {
    const tipe = e.target.value;
    const jumlah = parseInt(formData.jumlah) || 0;
    const stokAwal = parseInt(formData.stokAwal) || 0;
    
    let stokAkhir = stokAwal;
    if (tipe === "masuk") {
      stokAkhir = stokAwal + jumlah;
    } else {
      stokAkhir = stokAwal - jumlah;
    }

    setFormData({
      ...formData,
      tipe: tipe,
      stokAkhir: stokAkhir
    });
  };

  const handleStokAwalChange = (e) => {
    const stokAwal = parseInt(e.target.value) || 0;
    const jumlah = parseInt(formData.jumlah) || 0;
    
    let stokAkhir = stokAwal;
    if (formData.tipe === "masuk") {
      stokAkhir = stokAwal + jumlah;
    } else {
      stokAkhir = stokAwal - jumlah;
    }

    setFormData({
      ...formData,
      stokAwal: stokAwal,
      stokAkhir: stokAkhir
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Tambah Perubahan Stok</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
              <select
                name="tipe"
                value={formData.tipe}
                onChange={handleTipeChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="masuk">Stok Masuk</option>
                <option value="keluar">Stok Keluar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok Awal</label>
              <input
                type="number"
                name="stokAwal"
                placeholder="Stok Awal"
                value={formData.stokAwal}
                onChange={handleStokAwalChange}
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Perubahan</label>
              <input
                type="number"
                name="jumlah"
                placeholder="Jumlah Perubahan"
                value={formData.jumlah}
                onChange={handleJumlahChange}
                className="w-full p-2 border rounded"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok Akhir</label>
              <input
                type="number"
                name="stokAkhir"
                value={formData.stokAkhir}
                className="w-full p-2 border rounded bg-gray-100"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                Stok Akhir dihitung otomatis: Stok Awal {formData.tipe === "masuk" ? "+" : "-"} Jumlah
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
              <input
                type="text"
                name="keterangan"
                placeholder="Keterangan (opsional)"
                value={formData.keterangan}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}