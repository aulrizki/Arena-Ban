// HistoryPage.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StockDialog from "../components/StockDialog";
import { mockStockHistory } from "../data/mockStockHistory";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchParams] = useSearchParams();
  
  // Get barang parameters from URL
  const barangId = searchParams.get('barang_id');
  const merk = searchParams.get('merk');
  const tipe = searchParams.get('tipe');

  useEffect(() => {
    try {
      let filteredHistory = mockStockHistory || [];
      
      // Filter history by barang if parameters exist
      if (barangId) {
        filteredHistory = filteredHistory.filter(item => 
          item.barang_id === parseInt(barangId)
        );
      }
      
      const sortedHistory = sortHistory(filteredHistory, sortOrder);
      setHistory(sortedHistory);
    } catch (error) {
      console.error("Error loading stock history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [sortOrder, barangId]);

  const sortHistory = (data, order) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.tanggal);
      const dateB = new Date(b.tanggal);
      return order === "desc" ? dateB - dateA : dateA - dateB;
    });
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // HistoryPage.js - MODIFIKASI handleAddStock
const handleAddStock = (newEntry) => {
  const newEntryWithId = { 
    id: history.length + 1, 
    barang_id: barangId ? parseInt(barangId) : null,
    tanggal: newEntry.tanggal || new Date().toISOString().split('T')[0],
    tipe: newEntry.tipe || "masuk",
    jumlah: parseInt(newEntry.jumlah) || 0,
    stokAwal: parseInt(newEntry.stokAwal) || 0,
    stokAkhir: parseInt(newEntry.stokAkhir) || 0,
    keterangan: newEntry.keterangan || ""
  };
  
  const newHistory = sortHistory([...history, newEntryWithId], sortOrder);
  setHistory(newHistory);
  setOpenDialog(false);
};

  const getTipeDisplay = (item) => {
    return item.tipe === "masuk" ? "Masuk" : "Keluar";
  };

  const getJumlahDisplay = (item) => {
    return item.tipe === "masuk" ? `+${item.jumlah}` : `-${item.jumlah}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-32">
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Stok Barang</h1>
          {barangId ? (
            <p className="text-gray-600 mt-1">
              Menampilkan riwayat untuk: <span className="font-semibold">{merk} - {tipe}</span>
              <button 
                onClick={() => window.history.back()}
                className="ml-4 text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Kembali ke semua barang
              </button>
            </p>
          ) : (
            <p className="text-gray-600 mt-1">Semua riwayat stok barang</p>
          )}
        </div>
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          + Tambah Perubahan Stok
        </button>
      </div>

      {/* Sort Controls */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Urutkan tanggal:</span>
          <button
            onClick={handleSortToggle}
            className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <span>{sortOrder === "desc" ? "Terbaru → Terlama" : "Terlama → Terbaru"}</span>
            <svg 
              className={`w-4 h-4 transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {barangId ? "Belum ada riwayat stok untuk barang ini" : "Belum ada riwayat stok"}
          </p>
          <button
            onClick={() => setOpenDialog(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Riwayat Pertama
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left font-semibold text-gray-700">Tanggal</th>
                <th className="p-3 text-left font-semibold text-gray-700">Masuk/Keluar</th>
                <th className="p-3 text-left font-semibold text-gray-700">Jumlah</th>
                <th className="p-3 text-left font-semibold text-gray-700">Stok Awal</th>
                <th className="p-3 text-left font-semibold text-gray-700">Stok Akhir</th>
                <th className="p-3 text-left font-semibold text-gray-700">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.tanggal}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.tipe === "masuk" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {getTipeDisplay(item)}
                    </span>
                  </td>
                  <td className={`p-3 font-semibold ${
                    item.tipe === "masuk" ? "text-green-600" : "text-red-600"
                  }`}>
                    {getJumlahDisplay(item)}
                  </td>
                  <td className="p-3 text-gray-600">{item.stokAwal}</td>
                  <td className="p-3 font-medium text-blue-600">{item.stokAkhir}</td>
                  <td className="p-3 text-gray-600">{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openDialog && (
        <StockDialog 
          onClose={() => setOpenDialog(false)} 
          onSave={handleAddStock} 
        />
      )}
    </div>
  );
}