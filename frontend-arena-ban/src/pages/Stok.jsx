import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import useSWR from "swr"
import axios from "axios"
import StokDialog from "../components/StokDialog"

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Stok = () => {
  const { id } = useParams()
  const { data: barang, mutate: mutateBarang } = useSWR(`http://localhost:5000/barang/${id}`, fetcher)
  const { data: stokList, mutate } = useSWR("http://localhost:5000/stok", fetcher)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [dialogMode, setDialogMode] = useState("tambah")

  // ✅ Tambahan: state untuk alert elegan
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [errorAlert, setErrorAlert] = useState(null)
  const [successAlert, setSuccessAlert] = useState(null)

  if (!barang) return <p className="text-center text-[#1E3A8A] font-semibold mt-10">Memuat data barang...</p>
  if (!stokList) return <p className="text-center text-[#1E3A8A] font-semibold mt-10">Memuat riwayat stok...</p>

  const stokBarang = stokList
    .filter((s) => s.id_barang === parseInt(id))
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))

  const handleOpenTambah = () => {
    setDialogMode("tambah")
    setEditData(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (stokItem) => {
    setDialogMode("edit")
    setEditData(stokItem)
    setDialogOpen(true)
  }

  const handleDialogSuccess = () => {
    mutate()
    mutateBarang()
    setSuccessAlert("Data stok berhasil disimpan.")
  }

  // ✅ Ubah handleDelete jadi popup konfirmasi
  const handleDelete = (idStok) => {
    const stokItem = stokBarang.find((s) => s.id === idStok)
    setConfirmDelete({
      id: idStok,
      jenis: stokItem?.jenis,
      jumlah: stokItem?.jumlah,
    })
  }

  const confirmDeleteAction = async () => {
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/stok/${confirmDelete.id}`)
        mutate()
        mutateBarang()
        setConfirmDelete(null)
        setSuccessAlert("Riwayat stok berhasil dihapus.")
      } catch (error) {
        console.error(error)
        setErrorAlert("Gagal menghapus data stok.")
      }
    }
  }

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen rounded-2xl shadow-inner">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1E3A8A]">
          Riwayat Stok — {barang.nama_barang} ({barang.kategori})
        </h1>
        <Link
          to="/barang"
          className="bg-[#64748B] text-white px-4 py-2 rounded-lg hover:bg-[#475569] transition-all"
        >
          ← Kembali ke Barang
        </Link>
      </div>

      {/* Info stok saat ini */}
      <div className="mb-6 bg-white border border-[#E2E8F0] p-4 rounded-2xl shadow-sm">
        <p className="font-semibold text-[#1E293B]">
          Stok Saat Ini:{" "}
          <span className="text-[#1E3A8A] font-bold">{barang.stok}</span>
        </p>
      </div>

      {/* Tombol tambah stok */}
      <div className="mb-6">
        <button
          onClick={handleOpenTambah}
          className="bg-[#1E3A8A] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#1D4ED8] transition-all"
        >
          + Tambah Riwayat Stok
        </button>
      </div>

      {/* TABEL STOK */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-[#1E293B]">
          <thead className="bg-[#1E3A8A] text-white">
            <tr>
              <th className="p-3 text-center">Tanggal</th>
              <th className="p-3 text-center">Jenis</th>
              <th className="p-3 text-center">Stok Awal</th>
              <th className="p-3 text-center">Jumlah</th>
              <th className="p-3 text-center">Stok Akhir</th>
              <th className="p-3 text-center">Keterangan</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {stokBarang.length > 0 ? (
              stokBarang.map((item, index) => {
                const stokAwal =
                  item.jenis === "Masuk"
                    ? item.stok_setelah - item.jumlah
                    : item.stok_setelah + item.jumlah

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                    } hover:bg-[#E2E8F0]/60`}
                  >
                    <td className="p-3 border-t border-[#E2E8F0] text-center">
                      {new Date(item.tanggal).toLocaleString("id-ID")}
                    </td>
                    <td
                      className={`p-3 border-t border-[#E2E8F0] text-center font-semibold ${
                        item.jenis === "Masuk"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.jenis}
                    </td>
                    <td className="p-3 border-t border-[#E2E8F0] text-center">{stokAwal}</td>
                    <td className="p-3 border-t border-[#E2E8F0] text-center">{item.jumlah}</td>
                    <td className="p-3 border-t border-[#E2E8F0] text-center">{item.stok_setelah}</td>
                    <td className="p-3 border-t border-[#E2E8F0] text-center">{item.keterangan || "-"}</td>
                    <td className="p-3 border-t border-[#E2E8F0] text-center space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-4 border-t border-[#E2E8F0] text-center text-[#475569]"
                >
                  Belum ada riwayat stok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog Component */}
      <StokDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={handleDialogSuccess}
        barang={barang}
        stokData={editData}
        mode={dialogMode}
      />

      {/* ✅ Popup Konfirmasi Hapus */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 border border-[#E2E8F0] text-center">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">
              Hapus Riwayat Stok?
            </h3>
            <p className="text-sm text-[#475569] mb-6">
              Apakah kamu yakin ingin menghapus riwayat{" "}
              <span className="font-semibold text-[#1E3A8A]">
                {confirmDelete.jenis} ({confirmDelete.jumlah})
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

      {/* ✅ Popup Error */}
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

      {/* ✅ Popup Sukses */}
      {successAlert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 border border-[#E2E8F0] text-center">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">
              Berhasil!
            </h3>
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
  )
}

export default Stok
