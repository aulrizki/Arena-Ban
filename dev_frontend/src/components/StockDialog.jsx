import React, { useState } from "react";

export default function StockDialog({ onClose, onSave, stokAwal = 0 }) {
  const [formData, setFormData] = useState({
    tipe: "masuk",
    jumlah: 0,
    keterangan: ""
  });

  const stokAkhir = formData.tipe === "masuk" 
    ? stokAwal + parseInt(formData.jumlah || 0)
    : stokAwal - parseInt(formData.jumlah || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.jumlah > 0) {
      onSave({
        ...formData,
        stokAwal,
        stokAkhir
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 border border-[#E2E8F0]">
        <h2 className="text-lg font-semibold mb-4 text-[#1E293B]">
          Tambah Perubahan Stok
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Tipe */}
          <select
            name="tipe"
            value={formData.tipe}
            onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
            className="w-full p-2 border border-[#CBD5E1] rounded-lg"
            required
          >
            <option value="masuk">Stok Masuk</option>
            <option value="keluar">Stok Keluar</option>
          </select>

          {/* Jumlah */}
          <input
            type="number"
            name="jumlah"
            placeholder="Jumlah"
            value={formData.jumlah}
            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
            className="w-full p-2 border border-[#CBD5E1] rounded-lg"
            min="1"
            required
          />

          {/* Keterangan */}
          <input
            type="text"
            name="keterangan"
            placeholder="Keterangan (opsional)"
            value={formData.keterangan}
            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            className="w-full p-2 border border-[#CBD5E1] rounded-lg"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
