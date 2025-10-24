// src/components/MerkDialog.jsx
import React from "react";

const MerkDialog = ({
  isOpen,
  onClose,
  onSubmit,
  namaMerk,
  setNamaMerk,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 border border-[#E2E8F0]">
        <h3 className="text-lg font-semibold text-[#1E3A8A] mb-4 text-center">
          {isEditing ? "Edit Merk" : "Tambah Merk"}
        </h3>

        <form onSubmit={onSubmit}>
          <label className="block mb-2 font-semibold text-[#334155]">
            Nama Merk
          </label>
          <input
            type="text"
            value={namaMerk}
            onChange={(e) => setNamaMerk(e.target.value)}
            className="border border-[#CBD5E1] rounded-lg px-3 py-2 w-full mb-4 text-sm focus:ring-2 focus:ring-[#1E3A8A] outline-none"
            placeholder="Masukkan nama merk"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-400 hover:bg-gray-500 text-white font-medium transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-medium transition-all"
            >
              {isEditing ? "Simpan Perubahan" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MerkDialog;