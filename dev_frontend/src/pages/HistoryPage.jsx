import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StockDialog from "../components/StockDialog";
import api from "../services/api";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const barangId = searchParams.get("barang_id");
  const merk = searchParams.get("merk");
  const tipe = searchParams.get("tipe");

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/stok?barang_id=${barangId}`);
      setHistory(res.data);
    } catch (error) {
      console.error("Gagal memuat riwayat stok:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStock = async (newEntry) => {
    try {
      await api.post("/stok", {
        id_barang: barangId,
        jenis: newEntry.tipe,
        jumlah: parseInt(newEntry.jumlah),
        keterangan: newEntry.keterangan
      });
      fetchHistory();
      setOpenDialog(false);
    } catch (err) {
      console.error("Gagal menambah stok:", err);
    }
  };

  useEffect(() => {
    if (barangId) fetchHistory();
  }, [barangId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Stok</h1>
          {barangId && (
            <p className="text-gray-600 mt-1">
              {merk} - {tipe}
            </p>
          )}
        </div>
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Tambah Perubahan Stok
        </button>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Jenis</th>
              <th className="p-2 border">Jumlah</th>
              <th className="p-2 border">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.tanggal}</td>
                <td className="p-2 border">{item.jenis}</td>
                <td className="p-2 border">{item.jumlah}</td>
                <td className="p-2 border">{item.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {openDialog && (
        <StockDialog onClose={() => setOpenDialog(false)} onSave={handleAddStock} />
      )}
    </div>
  );
}
