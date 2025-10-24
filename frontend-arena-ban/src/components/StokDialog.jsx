import React, { useState, useEffect } from "react"
import axios from "axios"

const StokDialog = ({
  open,
  onClose,
  onSuccess,
  barang,
  stokData = null,
  mode = "tambah",
}) => {
  const [form, setForm] = useState({
    jenis: "",
    jumlah: "",
    keterangan: "",
  })
  const [loading, setLoading] = useState(false)

  // Reset form ketika dialog dibuka atau mode berubah
  useEffect(() => {
    if (open) {
      if (mode === "edit" && stokData) {
        setForm({
          jenis: stokData.jenis,
          jumlah: stokData.jumlah.toString(),
          keterangan: stokData.keterangan || "",
        })
      } else {
        setForm({
          jenis: "",
          jumlah: "",
          keterangan: "",
        })
      }
    }
  }, [open, mode, stokData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!barang) return
    setLoading(true)

    try {
      const jumlah = parseInt(form.jumlah)
      const stokAwal = barang.stok
      let stokAkhir = stokAwal

      if (form.jenis === "Masuk") stokAkhir += jumlah
      else if (form.jenis === "Keluar") stokAkhir -= jumlah

      if (mode === "tambah") {
        await axios.post("http://localhost:5000/stok", {
          id_barang: barang.id,
          jenis: form.jenis,
          jumlah,
          keterangan: form.keterangan,
        })

        await axios.put(`http://localhost:5000/barang/${barang.id}`, {
          ...barang,
          stok: stokAkhir,
        })
      } else if (mode === "edit" && stokData) {
        await axios.put(`http://localhost:5000/stok/${stokData.id}`, {
          ...stokData,
          jenis: form.jenis,
          jumlah,
          keterangan: form.keterangan,
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error(error)
      alert(`Gagal ${mode === "tambah" ? "menambahkan" : "mengedit"} stok.`)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3 mb-4">
          <h2 className="text-xl font-bold text-[#1E3A8A]">
            {mode === "tambah" ? "Tambah Stok Barang" : "Edit Riwayat Stok"}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-[#64748B] hover:text-[#1E293B] text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#334155] mb-1">
              Jenis Stok *
            </label>
            <select
              value={form.jenis}
              onChange={(e) => setForm({ ...form, jenis: e.target.value })}
              className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              required
              disabled={loading}
            >
              <option value="">Pilih Jenis</option>
              <option value="Masuk">Masuk</option>
              <option value="Keluar">Keluar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#334155] mb-1">
              Jumlah *
            </label>
            <input
              type="number"
              min="1"
              value={form.jumlah}
              onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
              className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              placeholder="Masukkan jumlah stok"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#334155] mb-1">
              Keterangan
            </label>
            <textarea
              value={form.keterangan}
              onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
              className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              placeholder="Keterangan (opsional)"
              rows="3"
              disabled={loading}
            />
          </div>

          {barang && (
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
              <p className="text-sm text-[#475569]">
                <strong>Barang:</strong> {barang.nama_barang}
              </p>
              <p className="text-sm text-[#475569]">
                <strong>Stok Saat Ini:</strong> {barang.stok}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1] font-medium transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white hover:bg-[#1D4ED8] font-medium transition-all flex items-center justify-center"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
                  ></path>
                </svg>
              )}
              {mode === "tambah" ? "Tambah" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StokDialog