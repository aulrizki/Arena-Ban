import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-md ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 bg-gray-100 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Arena Ban</h2>
      <nav className="space-y-2">
        <Link to="/" className={linkClass("/")}>Dashboard</Link>
        <Link to="/barang" className={linkClass("/barang")}>Barang</Link>
        <Link to="/merk" className={linkClass("/merk")}>Merk</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
