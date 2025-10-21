import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-[#2563EB] text-white shadow-md"
        : "text-[#475569] hover:bg-[#DBEAFE] hover:text-[#1E3A8A]"
    }`;

  return (
    <div className="w-64 bg-white border-r border-[#E2E8F0] min-h-screen p-6 shadow-sm flex flex-col">
      <div className="mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2563EB] text-white flex items-center justify-center rounded-lg font-bold shadow-md">
            A
          </div>
          <h2 className="text-lg font-bold text-[#1E3A8A] tracking-tight">
            Arena Ban
          </h2>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        <Link to="/" className={linkClass("/")}>
          Dashboard
        </Link>
        <Link to="/barang" className={linkClass("/barang")}>
          Barang
        </Link>
        <Link to="/merk" className={linkClass("/merk")}>
          Merk
        </Link>
      </nav>

      <p className="text-xs text-gray-400 text-center mt-auto">
        © 2025 Arena Ban
      </p>
    </div>
  );
};

export default Sidebar;
