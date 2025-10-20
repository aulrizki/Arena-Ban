import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahMerk = () => {
  const [namaMerk, setNamaMerk] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/merk", { nama: namaMerk });
      navigate("/merk");
    } catch (err) {
      console.error("Gagal menambah merk:", err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tambah Merk Baru</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
        <label className="block mb-2 font-semibold">Nama Merk</label>
        <input
          type="text"
          value={namaMerk}
          onChange={(e) => setNamaMerk(e.target.value)}
          placeholder="Masukkan nama merk..."
          className="border p-2 rounded w-full mb-4"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/merk")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahMerk;
