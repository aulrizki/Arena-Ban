// utils/stockCalculator.js
export const calculateCurrentStock = (barangId, stockHistory) => {
  if (!barangId || !stockHistory || stockHistory.length === 0) return 0;
  
  // Filter riwayat berdasarkan barang_id
  const barangHistory = stockHistory.filter(item => item.barang_id === parseInt(barangId));
  if (barangHistory.length === 0) return 0;
  
  // Urutkan dari tanggal terbaru dan ambil stokAkhir yang paling baru
  const sortedHistory = barangHistory.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  return sortedHistory[0].stokAkhir;
};