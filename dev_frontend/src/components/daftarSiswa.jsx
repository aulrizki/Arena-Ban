import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetcher = async () => {
  const response = await axios.get('http://localhost:5000/siswa', {
    headers: { Accept: 'application/json' },
  });
  return response.data;
};

const deleteSiswa = async (id) => {
  if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
    await axios.delete(`http://localhost:5000/siswa/${id}`);
  }
};

const DaftarSiswa = () => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR('http://localhost:5000/siswa', fetcher);

  if (error) return <h1 className="text-center text-red-400 mt-10">Gagal memuat data</h1>;
  if (!data) return <h1 className="text-center text-yellow-300 mt-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-[#1e1a17]  text-[#d7ccc0] font-serif p-8 ">
      <div className="max-w-4xl mx-auto bg-[#2d2b26]/80 shadow-xl rounded-2xl p-6 border border-[#5b4636]">
        {/* Header + Tombol Tambah */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#e6c68e] tracking-wide border-b border-[#5b4636] pb-2">Daftar Siswa</h2>
          <Link
            to="/tambah"
            className="bg-[#274029] text-[#f5e6ca] px-4 py-2 rounded-lg border border-green-800 hover:bg-[#2f4f30] hover:text-[#e6c68e] transition duration-200 shadow-sm"
          >
            + Tambah Siswa
          </Link>
        </div>

 <div className="overflow-x-auto w-full max-w-4xl shadow-[0_0_25px_rgba(0,0,0,0.5)] bg-[#2b2521] rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#3a312b] text-[#d7ccc0] uppercase text-sm tracking-wider">
            <tr className="bg-[#3c3a35]/70 text-[#e6c68e]">
              <th className="px-4 py-3 border-b border-[#5a4e42]">No</th>
              <th className="px-4 py-3 border-b border-[#5a4e42]">Nama</th>
              <th className="px-4 py-3 border-b border-[#5a4e42]">Umur</th>
              <th className="px-4 py-3 border-b border-[#5a4e42]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((siswa, idx) => (
              <tr
                key={siswa.id}
                className="hover:bg-[#4b443c]/30 transition-colors duration-200"
              >
                <td className="px-4 py-3 border-b border-[#5a4e42]">{idx + 1}</td>
                <td className="px-4 py-3 border-b border-[#5a4e42]">{siswa.nama}</td>
                <td className="px-4 py-3 border-b border-[#5a4e42]">{siswa.umur}</td>
                <td className="px-4 py-3 border-b border-[#5a4e42] space-x-3">
                  <Link
                    to={`/edit/${siswa.id}`}
                    className="px-3 py-1 bg-[#6b584c] hover:bg-[#816b5f] text-[#f2e9dc] rounded transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteSiswa(siswa.id)}
                    className="px-3 py-1 bg-[#7a4e3a] hover:bg-[#8f5b44] text-[#f2e9dc] rounded transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="text-center mt-6">
          <button
            onClick={() => mutate('http://localhost:5000/siswa')}
           className="mt-8 px-5 py-2 bg-[#4a4036] hover:bg-[#5a4b40] text-[#f0e8dd] rounded-lg shadow-md tracking-wide transition"
          >
            Refresh ✨
          </button>
        </div> */}
      </div>
    </div>
  </div>
  );
};

export default DaftarSiswa;
