// components/BarangTable.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BarangTable({ data, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleStockClick = (item) => {
    navigate(`/history?barang_id=${item.id}&merk=${encodeURIComponent(item.merk)}&tipe=${encodeURIComponent(item.tipe)}`);
  };

  if (!data || data.length === 0) {
    return <p className="text-gray-500">Belum ada data barang.</p>;
  }

  return (
    <table className="w-full border border-gray-200 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Merk</th>
          <th className="p-2 border">Tipe</th>
          <th className="p-2 border">Jenis</th>
          <th className="p-2 border">Harga Modal</th>
          <th className="p-2 border">Stok</th>
          <th className="p-2 border text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="p-2 border">{item.merk}</td>
            <td className="p-2 border">{item.tipe}</td>
            <td className="p-2 border">{item.jenis}</td>
            <td className="p-2 border">Rp {item.harga_modal?.toLocaleString()}</td>
            <td className="p-2 border">
              <button
                onClick={() => handleStockClick(item)}
                className="w-full py-1 px-2 bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors flex items-center justify-between group"
                title="Klik untuk melihat riwayat stok"
              >
                <span>{item.stok || 0}</span>
                <svg 
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </td>
            <td className="p-2 border text-center space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}