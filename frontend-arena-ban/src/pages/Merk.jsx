import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Merk = () => {
  const { data, error, mutate } = useSWR("http://localhost:5000/merk", fetcher);
  const [namaMerk, setNamaMerk] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ✅ Tambah merk
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!namaMerk.trim()) return alert("Nama merk tidak boleh kosong!");
    try {
      await axios.post("http://localhost:5000/merk", { nama_merk: namaMerk });
      setNamaMerk("");
      setShowForm(false);
      mutate(); // refresh data
    } catch (err) {
      console.error(err);
      alert("Gagal menambah merk!");
    }
  };

  // ✅ Edit merk
  const handleEdit = (merk) => {
    setEditingId(merk.id);
    setNamaMerk(merk.nama_merk);
    setShowForm(true);
  };

  // ✅ Simpan perubahan
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!namaMerk.trim()) return alert("Nama merk tidak boleh kosong!");
    try {
      await axios.put(`http://localhost:5000/merk/${editingId}`, { nama_merk: namaMerk });
      setNamaMerk("");
      setEditingId(null);
      setShowForm(false);
      mutate(); // refresh data
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah merk!");
    }
  };

  // ✅ Hapus merk
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus merk ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/merk/${id}`);
      mutate(); // refresh data
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus merk!");
    }
  };

  if (error) return <div className="p-4 text-red-600">Gagal memuat data merk.</div>;
  if (!data) return <div className="p-4">Memuat data...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Merk</h1>

      {/* Tombol tambah merk */}
      <button
        onClick={() => {
          setShowForm(true);
          setEditingId(null);
          setNamaMerk("");
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition"
      >
        Tambah Merk
      </button>

      {/* Form tambah/edit merk */}
      {showForm && (
        <form
          onSubmit={editingId ? handleUpdate : handleAdd}
          className="bg-gray-100 p-4 rounded-lg shadow mb-6"
        >
          <label className="block mb-2 font-semibold">Nama Merk</label>
          <input
            type="text"
            value={namaMerk}
            onChange={(e) => setNamaMerk(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
            placeholder="Masukkan nama merk"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {editingId ? "Simpan Perubahan" : "Tambah"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setNamaMerk("");
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Tabel data merk */}
      <table className="w-full border border-gray-300 text-left shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nama Merk</th>
            <th className="py-2 px-4 border">Aktivitas</th>
          </tr>
        </thead>
        <tbody>
          {data.map((merk) => (
            <tr key={merk.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{merk.id}</td>
              <td className="py-2 px-4 border">{merk.nama_merk}</td>
              <td className="py-2 px-4 border flex gap-2">
                <button
                  onClick={() => handleEdit(merk)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(merk.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Merk;
