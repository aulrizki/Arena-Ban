export default function Dashboard() {
  // 🔹 Data barang contoh (ban & velg)
  const dataBarang = [
    { id: 1, nama: "Ban Bridgestone", kategori: "Ban", terjual: 120 },
    { id: 2, nama: "Ban Dunlop", kategori: "Ban", terjual: 95 },
    { id: 3, nama: "Velg Enkei", kategori: "Velg", terjual: 80 },
    { id: 4, nama: "Velg BBS", kategori: "Velg", terjual: 60 },
  ];

  // 🔹 Urutkan dari penjualan terbanyak
  const dataTerbanyak = [...dataBarang].sort((a, b) => b.terjual - a.terjual);

  return (
    <div className="flex flex-col items-center pt-16 text-center">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-[#1E3A8A] tracking-tight drop-shadow-sm">
        Selamat Datang di Arena Ban 🚗
      </h1>
      <p className="text-sm text-[#475569] mt-2">
        Kelola data barang dan merk dengan mudah melalui sistem modern kami.
      </p>

      {/* Card Barang */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl px-6">
        {/* Card Barang */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-md hover:shadow-lg transition-all p-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center rounded-xl text-2xl font-bold mb-3">
              📦
            </div>
            <h3 className="text-lg font-semibold text-[#1E3A8A]">Data Barang</h3>
            <p className="text-sm text-[#475569] mt-1">
              Kelola semua jenis barang dengan mudah.
            </p>
          </div>
        </div>

        {/* Card Merk */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-md hover:shadow-lg transition-all p-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center rounded-xl text-2xl font-bold mb-3">
              🏷️
            </div>
            <h3 className="text-lg font-semibold text-[#1E3A8A]">Data Merk</h3>
            <p className="text-sm text-[#475569] mt-1">
              Atur dan tambahkan merk ban & velg baru.
            </p>
          </div>
        </div>

        {/* Card Stok */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-md hover:shadow-lg transition-all p-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center rounded-xl text-2xl font-bold mb-3">
              📊
            </div>
            <h3 className="text-lg font-semibold text-[#1E3A8A]">Data Stok</h3>
            <p className="text-sm text-[#475569] mt-1">
              Pantau ketersediaan stok secara real-time.
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Tabel Data Penjualan Terbanyak */}
      <div className="mt-12 w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 text-left">
         Data Stok Terbanyak
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-[#1E293B]">
            <thead className="bg-[#1E3A8A] text-white">
              <tr>
                <th className="p-3 text-left font-medium">No</th>
                <th className="p-3 text-left font-medium">Nama Produk</th>
                <th className="p-3 text-left font-medium">Kategori</th>
                <th className="p-3 text-right font-medium">Stok</th>
              </tr>
            </thead>
            <tbody>
              {dataTerbanyak.map((item, index) => (
                <tr
                  key={item.id}
                  className={`transition-all duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                  } hover:bg-[#E2E8F0]/60`}
                >
                  <td className="p-3 border-t border-[#E2E8F0]">{index + 1}</td>
                  <td className="p-3 border-t border-[#E2E8F0]">{item.nama}</td>
                  <td className="p-3 border-t border-[#E2E8F0]">{item.kategori}</td>
                  <td className="p-3 border-t border-[#E2E8F0] text-right font-semibold text-[#1E3A8A]">
                    {item.terjual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
