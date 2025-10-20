import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import useSWR from "swr"
import axios from "axios"

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Stok = () => {
  const { id } = useParams()
  const { data: barang, mutate: mutateBarang } = useSWR(`http://localhost:5000/barang/${id}`, fetcher)
  const { data: stokList, mutate } = useSWR("http://localhost:5000/stok", fetcher)

  const [form, setForm] = useState({
    jenis: "",
    jumlah: "",
    keterangan: "",
  })

  if (!barang) return <p>Memuat data barang...</p>
  if (!stokList) return <p>Memuat riwayat stok...</p>

  // Filter riwayat hanya untuk barang ini
  const stokBarang = stokList
    .filter((s) => s.id_barang === parseInt(id))
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))

  // Fungsi tambah stok masuk/keluar
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // ambil stok awal dari data barang terbaru
      const stokAwal = barang.stok
      const jumlah = parseInt(form.jumlah)
      let stokAkhir = stokAwal

      if (form.jenis === "Masuk") {
        stokAkhir = stokAwal + jumlah
      } else if (form.jenis === "Keluar") {
        stokAkhir = stokAwal - jumlah
      }

      // kirim data ke backend
      await axios.post("http://localhost:5000/stok", {
        id_barang: parseInt(id),
        jenis: form.jenis,
        jumlah: jumlah,
        keterangan: form.keterangan,
      })

      // perbarui stok barang di database
      await axios.put(`http://localhost:5000/barang/${id}`, {
        ...barang,
        stok: stokAkhir,
      })

      // refresh data
      mutate()
      mutateBarang()
      setForm({ jenis: "", jumlah: "", keterangan: "" })
    } catch (error) {
      alert("Gagal menambahkan data stok.")
      console.error(error)
    }
  }

  const handleDelete = async (idStok) => {
    if (confirm("Yakin ingin menghapus riwayat ini?")) {
      await axios.delete(`http://localhost:5000/stok/${idStok}`)
      mutate()
      mutateBarang()
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">
          Riwayat Stok — {barang.nama_barang} ({barang.kategori})
        </h1>
        <Link
          to="/barang"
          className="text-white bg-gray-600 px-3 py-2 rounded hover:bg-gray-700"
        >
          ← Kembali ke Barang
        </Link>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          Stok Saat Ini:{" "}
          <span className="text-blue-600">{barang.stok}</span>
        </p>
      </div>

      {/* FORM TAMBAH RIWAYAT STOK */}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-4 gap-3">
        <select
          name="jenis"
          value={form.jenis}
          onChange={(e) => setForm({ ...form, jenis: e.target.value })}
          className="border p-2 rounded"
          required
        >
          <option value="">Pilih Jenis</option>
          <option value="Masuk">Masuk</option>
          <option value="Keluar">Keluar</option>
        </select>

        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah"
          value={form.jumlah}
          onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="keterangan"
          placeholder="Keterangan (opsional)"
          value={form.keterangan}
          onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
        >
          Tambah Riwayat
        </button>
      </form>

      {/* TABEL RIWAYAT STOK */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Jenis</th>
            <th className="p-2 border">Stok Awal</th>
            <th className="p-2 border">Jumlah</th>
            <th className="p-2 border">Stok Akhir</th>
            <th className="p-2 border">Keterangan</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {stokBarang.length > 0 ? (
            stokBarang.map((item, index) => {
              // hitung stok awal berdasarkan urutan kronologis (dari stok_setelah sebelumnya)
              const stokAkhirSebelumnya =
                stokBarang[index + 1]?.stok_setelah || barang.stok - item.jumlah
              const stokAwal =
                item.jenis === "Masuk"
                  ? item.stok_setelah - item.jumlah
                  : item.stok_setelah + item.jumlah

              return (
                <tr key={item.id}>
                  <td className="p-2 border text-center">
                    {new Date(item.tanggal).toLocaleString("id-ID")}
                  </td>
                  <td
                    className={`p-2 border text-center font-semibold ${
                      item.jenis === "Masuk"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.jenis}
                  </td>
                  <td className="p-2 border text-center">{stokAwal}</td>
                  <td className="p-2 border text-center">{item.jumlah}</td>
                  <td className="p-2 border text-center">
                    {item.stok_setelah}
                  </td>
                  <td className="p-2 border">{item.keterangan || "-"}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="7" className="p-2 border text-center">
                Belum ada riwayat stok
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Stok
