import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import MerkDialog from "../components/MerkDialog"; // 👈 import komponen dialog

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Merk = () => {
  const { data, error, mutate } = useSWR("http://localhost:5000/merk", fetcher);
  const [namaMerk, setNamaMerk] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  if (error) return <p className="text-center text-red-600 mt-10">Gagal memuat data merk.</p>;
  if (!data) return <p className="text-center text-[#1E3A8A] mt-10">Memuat data...</p>;

  // ✅ Tambah merk
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!namaMerk.trim()) {
      setErrorAlert("Nama merk tidak boleh kosong!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/merk", { nama_merk: namaMerk });
      setNamaMerk("");
      setShowDialog(false);
      mutate();
      setSuccessAlert("Merk berhasil ditambahkan.");
    } catch (err) {
      console.error(err);
      setErrorAlert("Gagal menambah merk!");
    }
  };

  // ✅ Edit merk
  const handleEdit = (merk) => {
    setEditingId(merk.id);
    setNamaMerk(merk.nama_merk);
    setShowDialog(true);
  };

  // ✅ Update merk
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!namaMerk.trim()) {
      setErrorAlert("Nama merk tidak boleh kosong!");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/merk/${editingId}`, { nama_merk: namaMerk });
      setNamaMerk("");
      setEditingId(null);
      setShowDialog(false);
      mutate();
      setSuccessAlert("Merk berhasil diperbarui.");
    } catch (err) {
      console.error(err);
      setErrorAlert("Gagal mengubah merk!");
    }
  };

  // ✅ Konfirmasi hapus
  const handleDelete = (merk) => setConfirmDelete(merk);

  const confirmDeleteAction = async () => {
    try {
      await axios.delete(`http://localhost:5000/merk/${confirmDelete.id}`);
      mutate();
      setConfirmDelete(null);
      setSuccessAlert("Merk berhasil dihapus.");
    } catch (err) {
      console.error(err);
      setErrorAlert("Gagal menghapus merk!");
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen rounded-2xl shadow-inner">
      <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">Data Merk</h1>

      {/* Tombol Tambah */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setShowDialog(true);
            setEditingId(null);
            setNamaMerk("");
          }}
          className="bg-[#1E3A8A] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#1D4ED8] transition-all shadow-sm"
        >
          + Tambah Merk
        </button>
      </div>

      {/* Tabel Data Merk */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-[#1E293B]">
          <thead className="bg-[#1E3A8A] text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nama Merk</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((merk, index) => (
              <tr
                key={merk.id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                } hover:bg-[#E2E8F0]/60`}
              >
                <td className="p-3 border-t border-[#E2E8F0]">{merk.id}</td>
                <td className="p-3 border-t border-[#E2E8F0]">{merk.nama_merk}</td>
                <td className="p-3 border-t border-[#E2E8F0] text-center space-x-2">
                  <button
                    onClick={() => handleEdit(merk)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(merk)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Gunakan dialog tambah/edit */}
      <MerkDialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setEditingId(null);
          setNamaMerk("");
        }}
        onSubmit={editingId ? handleUpdate : handleAdd}
        namaMerk={namaMerk}
        setNamaMerk={setNamaMerk}
        isEditing={!!editingId}
      />

      {/* ✅ Popup konfirmasi & alert seperti sebelumnya */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 border border-[#E2E8F0] text-center">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">Hapus Merk?</h3>
            <p className="text-sm text-[#475569] mb-6">
              Yakin ingin menghapus{" "}
              <span className="font-semibold text-[#1E3A8A]">
                {confirmDelete.nama_merk}
              </span>
              ?<br />Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1] font-medium transition-all"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteAction}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all shadow-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Alert sukses & error */}
      {errorAlert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 border border-[#E2E8F0] text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Terjadi Kesalahan!
            </h3>
            <p className="text-sm text-[#475569] mb-6">{errorAlert}</p>
            <button
              onClick={() => setErrorAlert(null)}
              className="px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-medium transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {successAlert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 border border-[#E2E8F0] text-center">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">Berhasil!</h3>
            <p className="text-sm text-[#475569] mb-6">{successAlert}</p>
            <button
              onClick={() => setSuccessAlert(null)}
              className="px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-medium transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Merk;