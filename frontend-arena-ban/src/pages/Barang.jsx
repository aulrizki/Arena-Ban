import React, { useState } from "react"
import useSWR from "swr"
import axios from "axios"
import { Link } from "react-router-dom"

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Barang = () => {
  const { data: barangList, mutate } = useSWR("http://localhost:5000/barang", fetcher)
  const { data: merkList } = useSWR("http://localhost:5000/merk", fetcher)
  const [form, setForm] = useState({
    kategori: "",
    nama_barang: "",
    id_merk: "",
    modal: "",
    stok: "",
  })
  const [filterKategori, setFilterKategori] = useState("")
  const [filterMerk, setFilterMerk] = useState("")
  const [editingId, setEditingId] = useState(null)

  if (!barangList || !merkList) return <p>Memuat data...</p>

  const filteredBarang = barangList.filter(
    (b) =>
      (filterKategori ? b.kategori === filterKategori : true) &&
      (filterMerk ? b.id_merk === parseInt(filterMerk) : true)
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/barang/${editingId}`, {
          ...form,
          id_merk: parseInt(form.id_merk),
          modal: parseInt(form.modal),
          stok: parseInt(form.stok),
        })
      } else {
        await axios.post("http://localhost:5000/barang", {
          ...form,
          id_merk: parseInt(form.id_merk),
          modal: parseInt(form.modal),
          stok: parseInt(form.stok),
        })
      }
      mutate()
      setForm({ kategori: "", nama_barang: "", id_merk: "", modal: "", stok: "" })
      setEditingId(null)
    } catch (error) {
      alert("Gagal menyimpan data.")
      console.error(error)
    }
  }

  const handleEdit = (item) => {
    setForm({
      kategori: item.kategori,
      nama_barang: item.nama_barang,
      id_merk: item.id_merk,
      modal: item.modal,
      stok: item.stok,
    })
    setEditingId(item.id)
  }

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus barang ini?")) {
      await axios.delete(`http://localhost:5000/barang/${id}`)
      mutate()
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Data Barang</h1>

      {/* FILTER */}
      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setFilterKategori(e.target.value)}
          value={filterKategori}
          className="border p-2 rounded"
        >
          <option value="">Filter Kategori</option>
          <option value="Ban">Ban</option>
          <option value="Velg">Velg</option>
        </select>

        <select
          onChange={(e) => setFilterMerk(e.target.value)}
          value={filterMerk}
          className="border p-2 rounded"
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
          className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
        >
          Reset Filter
        </button>
      </div>

      {/* FORM TAMBAH / EDIT */}
      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-3 mb-6">
        <select
          name="kategori"
          value={form.kategori}
          onChange={(e) => setForm({ ...form, kategori: e.target.value })}
          className="border p-2 rounded"
          required
        >
          <option value="">Pilih Kategori</option>
          <option value="Ban">Ban</option>
          <option value="Velg">Velg</option>
        </select>

        <input
          type="text"
          name="nama_barang"
          placeholder="Nama Barang"
          value={form.nama_barang}
          onChange={(e) => setForm({ ...form, nama_barang: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <select
          name="id_merk"
          value={form.id_merk}
          onChange={(e) => setForm({ ...form, id_merk: e.target.value })}
          className="border p-2 rounded"
          required
        >
          <option value="">Pilih Merk</option>
          {merkList.map((merk) => (
            <option key={merk.id} value={merk.id}>
              {merk.nama_merk}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="modal"
          placeholder="Modal"
          value={form.modal}
          onChange={(e) => setForm({ ...form, modal: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="stok"
          placeholder="Stok"
          value={form.stok}
          onChange={(e) => setForm({ ...form, stok: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
        >
          {editingId ? "Update Barang" : "Tambah Barang"}
        </button>
      </form>

      {/* TABEL BARANG */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">Nama Barang</th>
            <th className="p-2 border">Merk</th>
            <th className="p-2 border">Modal</th>
            <th className="p-2 border">Stok</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredBarang.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border text-center">{item.id}</td>
              <td className="p-2 border text-center">{item.kategori}</td>
              <td className="p-2 border">{item.nama_barang}</td>
              <td className="p-2 border text-center">
                {item.merk?.nama_merk || "-"}
              </td>
              <td className="p-2 border text-center">{item.modal}</td>
              <td className="p-2 border text-center">
                <Link
                  to={`/stok/${item.id}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {item.stok}
                </Link>
              </td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Barang
