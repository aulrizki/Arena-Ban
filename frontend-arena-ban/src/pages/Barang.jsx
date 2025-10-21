import React, { useState } from "react"
import useSWR from "swr"
import axios from "axios"
import { Link } from "react-router-dom"
import BarangDialog from "../components/BarangDialog"

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Barang = () => {
  const { data: barangList, mutate } = useSWR("http://localhost:5000/barang", fetcher)
  const { data: merkList } = useSWR("http://localhost:5000/merk", fetcher)
  const [filterKategori, setFilterKategori] = useState("")
  const [filterMerk, setFilterMerk] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [selectedBarang, setSelectedBarang] = useState(null)

  // ✅ Tambahan state untuk alert elegan
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [errorAlert, setErrorAlert] = useState(null)
  const [successAlert, setSuccessAlert] = useState(null)

  if (!barangList || !merkList)
    return (
      <p className="text-center text-[#1E3A8A] font-semibold mt-10">
        Memuat data...
      </p>
    )

  const filteredBarang = barangList.filter(
    (b) =>
      (filterKategori ? b.kategori === filterKategori : true) &&
      (filterMerk ? b.id_merk === parseInt(filterMerk) : true)
  )

  const handleAdd = () => {
    setSelectedBarang(null)
    setShowDialog(true)
  }

  const handleEdit = (item) => {
    setSelectedBarang(item)
    setShowDialog(true)
  }

  // ✅ Ubah handleDelete jadi versi popup elegan
  const handleDelete = (id) => {
    const item = barangList.find((b) => b.id === id)
    setConfirmDelete({ id, nama: item?.nama_barang })
  }

  const confirmDeleteAction = async () => {
    if (confirmDelete) {
      await axios.delete(`http://localhost:5000/barang/${confirmDelete.id}`)
      mutate()
      setConfirmDelete(null)
      setSuccessAlert("Barang berhasil dihapus.")
    }
  }

  // ✅ Alert elegan di handleSave
  const handleSave = async (formData) => {
    try {
      if (selectedBarang) {
        await axios.put(`http://localhost:5000/barang/${selectedBarang.id}`, formData)
      } else {
        await axios.post("http://localhost:5000/barang", formData)
      }
      mutate()
      setShowDialog(false)
      setSuccessAlert("Data barang berhasil disimpan.")
    } catch (error) {
      setErrorAlert("Gagal menyimpan data. Silakan coba lagi.")
      console.error(error)
    }
  }

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen rounded-2xl shadow-inner">
      <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">Data Barang</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm">
        <select
          onChange={(e) => setFilterKategori(e.target.value)}
          value={filterKategori}
          className="border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A]"
        >
          <option value="">Filter Kategori</option>
          <option value="Ban">Ban</option>
          <option value="Velg">Velg</option>
        </select>

        <select
          onChange={(e) => setFilterMerk(e.target.value)}
          value={filterMerk}
          className="border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A]"
        >
          <option value="">Filter Merk</option>
          {merkList.map((merk) => (
            <option key={merk.id} value={merk.id}>
              {merk.nama_merk}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setFilterKategori("")
            setFilterMerk("")
          }}
          className="bg-[#64748B] text-white px-4 py-2 rounded-lg hover:bg-[#475569] transition-all"
        >
          Reset Filter
        </button>

        <button
          onClick={handleAdd}
          className="ml-auto bg-[#1E3A8A] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#1D4ED8] transition-all"
        >
          + Tambah Barang
        </button>
      </div>

      {/* Tabel Barang */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-[#1E293B]">
          <thead className="bg-[#1E3A8A] text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Nama Barang</th>
              <th className="p-3 text-left">Merk</th>
              <th className="p-3 text-center">Modal</th>
              <th className="p-3 text-center">Stok</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBarang.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                } hover:bg-[#E2E8F0]/60`}
              >
                <td className="p-3 border-t border-[#E2E8F0]">{item.id}</td>
                <td className="p-3 border-t border-[#E2E8F0]">{item.kategori}</td>
                <td className="p-3 border-t border-[#E2E8F0]">{item.nama_barang}</td>
                <td className="p-3 border-t border-[#E2E8F0] text-center">
                  {item.merk?.nama_merk || "-"}
                </td>
                <td className="p-3 border-t border-[#E2E8F0] text-center">
                  Rp {item.modal.toLocaleString("id-ID")}
                </td>
                <td className="p-3 border-t border-[#E2E8F0] text-center">
                  <Link
                    to={`/stok/${item.id}`}
                    className="text-[#1E3A8A] font-semibold hover:underline"
                  >
                    {item.stok}
                  </Link>
                </td>
                <td className="p-3 border-t border-[#E2E8F0] text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
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
            ))}
          </tbody>
        </table>
      </div>

      {showDialog && (
        <BarangDialog
          onClose={() => setShowDialog(false)}
          onSave={handleSave}
          initialData={selectedBarang}
          merkList={merkList}
        />
      )}

      {/* ✅ Popup Konfirmasi Hapus */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 border border-[#E2E8F0] text-center">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">
              Hapus Barang?
            </h3>
            <p className="text-sm text-[#475569] mb-6">
              Apakah kamu yakin ingin menghapus{" "}
              <span className="font-semibold text-[#1E3A8A]">
                {confirmDelete.nama}
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

export default Barang
