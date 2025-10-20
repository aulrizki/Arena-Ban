import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// Get semua data stok
export const getStok = async (req, res) => {
  try {
    const response = await prisma.stokHistory.findMany({
      // include: { barang: true },
      // orderBy: { tanggal: "desc" }
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message || "Terjadi kesalahan saat mengambil data stok." })
  }
}

// Get stok berdasarkan ID
export const getStokById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const response = await prisma.stokHistory.findUnique({
      where: { id },
      include: { barang: true }
    })

    if (!response) {
      return res.status(404).json({ message: "Data stok tidak ditemukan" })
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message || "Terjadi kesalahan saat mengambil data stok berdasarkan ID." })
  }
}

// Create stok baru (Masuk / Keluar)
export const createStok = async (req, res) => {
  try {
    const { id_barang, jenis, jumlah, keterangan } = req.body

    const barang = await prisma.barang.findUnique({
      where: { id: parseInt(id_barang) },
    })

    if (!barang) {
      return res.status(404).json({ message: "Barang tidak ditemukan" })
    }

    const stok_awal = barang.stok
    let stok_setelah

    if (jenis === "Masuk") {
      stok_setelah = stok_awal + jumlah
    } else if (jenis === "Keluar") {
      stok_setelah = stok_awal - jumlah
    } else {
      return res.status(400).json({ message: "Jenis harus 'Masuk' atau 'Keluar'" })
    }

    // ✅ Ambil waktu lokal WIB
    const tanggal = new Date(new Date().getTime() + 7 * 60 * 60 * 1000) // offset +7 jam UTC (Asia/Jakarta)

    const response = await prisma.stokHistory.create({
      data: {
        id_barang: parseInt(id_barang),
        tanggal, // waktu disimpan sesuai WIB
        jenis,
        jumlah,
        keterangan,
        stok_setelah,
      },
    })

    // Update stok barang di tabel Barang
    await prisma.barang.update({
      where: { id: parseInt(id_barang) },
      data: { stok: stok_setelah },
    })

    res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Terjadi kesalahan server" })
  }
}

// Update stok (bisa dikembangkan nanti)
export const updateStok = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { id_barang, jenis, jumlah, keterangan } = req.body

    const response = await prisma.stokHistory.update({
      where: { id },
      data: { id_barang, jenis, jumlah, keterangan }
    })

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message || "Terjadi kesalahan saat memperbarui data stok." })
  }
}

// Delete stok
export const deleteStok = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const response = await prisma.stokHistory.delete({
      where: { id }
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message || "Terjadi kesalahan saat menghapus data stok." })
  }
}
