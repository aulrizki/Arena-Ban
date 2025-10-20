// data/mockStockHistory.js
export const mockStockHistory = [
  // Data untuk Ban (barang_id: 1)
  {
    id: 1,
    barang_id: 1,
    tanggal: "2024-01-15",
    tipe: "masuk",
    jumlah: 50,
    stokAwal: 0,
    stokAkhir: 50,
    keterangan: "Stok awal"
  },
  {
    id: 2,
    barang_id: 1,
    tanggal: "2024-01-20",
    tipe: "keluar",
    jumlah: 10,
    stokAwal: 50,
    stokAkhir: 40,
    keterangan: "Penjualan"
  },
  {
    id: 3,
    barang_id: 1,
    tanggal: "2024-01-25",
    tipe: "masuk",
    jumlah: 30,
    stokAwal: 40,
    stokAkhir: 70,
    keterangan: "Restok"
  },
  
  // Data untuk Velg (barang_id: 2)
  {
    id: 4,
    barang_id: 2,
    tanggal: "2024-01-10",
    tipe: "masuk",
    jumlah: 20,
    stokAwal: 0,
    stokAkhir: 20,
    keterangan: "Stok awal velg"
  },
  {
    id: 5,
    barang_id: 2,
    tanggal: "2024-01-18",
    tipe: "keluar",
    jumlah: 5,
    stokAwal: 20,
    stokAkhir: 15,
    keterangan: "Penjualan velg"
  },
  {
    id: 6,
    barang_id: 2,
    tanggal: "2024-01-28",
    tipe: "masuk",
    jumlah: 10,
    stokAwal: 15,
    stokAkhir: 25,
    keterangan: "Restok velg"
  },

  // Data untuk barang lainnya...
  {
    id: 7,
    barang_id: 3,
    tanggal: "2024-01-12",
    tipe: "masuk",
    jumlah: 100,
    stokAwal: 0,
    stokAkhir: 100,
    keterangan: "Stok awal oli"
  }
];