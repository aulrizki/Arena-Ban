import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TambahSiswa = () => {
  const [nama, setNama] = useState('');
  const [umur, setUmur] = useState('');
  const navigate = useNavigate();

  // 👉 fungsi simpanSiswa diletakkan di sini
  const simpanSiswa = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/siswa', {
      nama: nama,
      umur: Number(umur),
    });
    navigate('/'); // redirect ke halaman daftar siswa setelah berhasil simpan
  };

  return (
    <div className="min-h-screen bg-[#1b1a17] text-[#f5e6ca] font-serif flex justify-center items-center p-6">
      <div className="bg-[#2d2b26]/80 p-8 rounded-2xl shadow-lg border border-[#5a4e42]/40 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#e6c68e] text-center mb-6">
          Tambah Siswa Baru
        </h2>

        {/* 👇 di sini kita pasang onSubmit */}
        <form onSubmit={simpanSiswa} className="space-y-5">
          <div>
            <label className="block mb-2 text-[#e6c68e]">Nama:</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama siswa"
              className="w-full px-3 py-2 rounded-lg bg-[#3c3a35] text-[#f5e6ca] border border-[#5a4e42] focus:ring-2 focus:ring-green-900 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-[#e6c68e]">Umur:</label>
            <input
              type="text"
              value={umur}
              onChange={(e) => setUmur(e.target.value)}
              placeholder="Masukkan umur siswa"
              className="w-full px-3 py-2 rounded-lg bg-[#3c3a35] text-[#f5e6ca] border border-[#5a4e42] focus:ring-2 focus:ring-green-900 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-[#274029] border border-green-800 text-[#f5e6ca] px-5 py-2 rounded-lg hover:bg-[#2f4f30] hover:text-[#e6c68e] transition duration-200"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-[#3c3a35] border border-[#5a4e42] text-[#f5e6ca] px-5 py-2 rounded-lg hover:bg-[#4b443c] transition duration-200"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahSiswa;
