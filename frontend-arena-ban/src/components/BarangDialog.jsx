import React, { useState, useEffect } from "react"

export default function BarangDialog({ onClose, onSave, initialData, merkList }) {
  const [formData, setFormData] = useState({
    kategori: "",
    nama_barang: "",
    id_merk: "",
    modal: "",
    stok: "",
  })

  useEffect(() => {
    if (initialData) {
      const { ...dataWithoutStock } = initialData
      setFormData(dataWithoutStock)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      id_merk: parseInt(formData.id_merk),
      modal: parseInt(formData.modal),
      stok: parseInt(formData.stok),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-2xl shadow-xl p-6 border border-[#E2E8F0]">
        <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">
          {initialData ? "Edit Barang" : "Tambah Barang"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="border border-[#CBD5E1] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E3A8A]"
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
            value={formData.nama_barang}
            onChange={handleChange}
            className="border border-[#CBD5E1] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E3A8A]"
            required
          />

          <select
            name="id_merk"
            value={formData.id_merk}
            onChange={handleChange}
            className="border border-[#CBD5E1] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E3A8A]"
            required
          >
            <option value="">Pilih Merk</option>
            {merkList?.map((merk) => (
              <option key={merk.id} value={merk.id}>
                {merk.nama_merk}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="modal"
            placeholder="Modal"
            value={formData.modal}
            onChange={handleChange}
            className="border border-[#CBD5E1] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E3A8A]"
            required
          />

          <input
            type="number"
            name="stok"
            placeholder="Stok"
            value={formData.stok}
            onChange={handleChange}
            className="border border-[#CBD5E1] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E3A8A]"
            required
          />

          {initialData && (
            <div className="bg-[#F1F5F9] p-3 rounded-lg text-sm text-gray-700">
              <p>
                Stok saat ini:{" "}
                <span className="font-semibold">{initialData.stok}</span>
              </p>
              <p className="text-xs text-gray-500">
                Stok dikelola otomatis melalui riwayat masuk/keluar
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#E2E8F0] text-gray-700 px-4 py-2 rounded-lg hover:bg-[#CBD5E1]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#1D4ED8]"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
