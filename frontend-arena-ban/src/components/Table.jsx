export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="text-left py-2 px-3 border-b border-gray-300">
              {col}
            </th>
          ))}
          <th className="py-2 px-3 border-b border-gray-300">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="py-2 px-3 border-b border-gray-200">{item.id}</td>
            <td className="py-2 px-3 border-b border-gray-200">
              {item.nama_merk}
            </td>
            <td className="py-2 px-3 border-b border-gray-200">
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
