import React, { useState, useEffect } from "react";

export default function BarangDialog({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    merk: "",
    tipe: "",
    harga_modal: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Barang" : "Tambah Barang"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {["merk", "tipe", "harga_modal"].map((field) => (
            <input
              key={field}
              type={field.includes("harga") ? "number" : "text"}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
