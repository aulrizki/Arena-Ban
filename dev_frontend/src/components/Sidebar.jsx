import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

export default function Sidebar() {
  const [openBarang, setOpenBarang] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm transition ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 shadow-sm">
      <h2 className="text-2xl font-bold text-green-700 mb-8">Arena Ban</h2>

      <nav className="space-y-1">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        {/* Barang Section */}
        <button
          onClick={() => setOpenBarang(!openBarang)}
          className="flex items-center justify-between w-full px-4 py-2 rounded text-gray-700 hover:bg-green-100 text-left"
        >
          <span>Barang</span>
          {openBarang ? (
            <IoChevronDown size={18} />
          ) : (
            <IoChevronForward size={18} />
          )}
        </button>

        {openBarang && (
          <div className="ml-4 space-y-1 border-l border-green-200 pl-2">
            <NavLink to="/barang/ban" className={linkClass}>
              Ban
            </NavLink>
            <NavLink to="/barang/velg" className={linkClass}>
              Velg
            </NavLink>
          </div>
        )}

      </nav>
    </aside>
  );
}
