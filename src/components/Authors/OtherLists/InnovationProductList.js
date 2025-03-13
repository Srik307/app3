import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

const InnovationProductList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleRows = () => setIsExpanded(!isExpanded);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const innovations = [
    {
      id: 1,
      type: "Product",
      title: "Smart Widget",
      date: "2022-07-01",
      role: "Lead Developer",
      url: "https://example.com/smart-widget",
    },
    {
      id: 2,
      type: "Innovation",
      title: "AI Assistant",
      date: "2023-08-20",
      role: "Researcher",
      url: "https://example.com/ai-assistant",
    },
    {
      id: 3,
      type: "Product",
      title: "Eco Device",
      date: "2023-09-25",
      role: "Designer",
      url: "https://example.com/eco-device",
    },
    {
      id: 4,
      type: "Innovation",
      title: "Quantum Processor",
      date: "2023-10-10",
      role: "Engineer",
      url: "https://example.com/quantum-processor",
    },
  ];

  const filteredInnovations = innovations.filter(
    (item) =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInnovations = [...filteredInnovations].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue === bValue) return 0;
    return sortOrder === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  const displayedInnovations = isExpanded ? sortedInnovations : sortedInnovations.slice(0, 1);

  const columns = [
    { key: "type", label: "TYPE OF INNOVATION" },
    { key: "title", label: "TITLE" },
    { key: "date", label: "DATE" },
    { key: "role", label: "ROLE" },
    { key: "url", label: "URL" },
  ];

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-blue-800">Innovation & Product Development</h2>
        <input
        type="text"
        placeholder="Search by type, title, date, role, or url..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
      />
        {sortedInnovations.length > 2 && (
          <button
            onClick={toggleRows}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        )}
      </div>
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm mt-3">
        <table className="w-full text-left border-collapse">
        <thead>
  <tr className="bg-blue-900 text-white text-sm uppercase">
    <th className="p-3 border border-blue-800 rounded-tl-md">SL NO</th>
    {columns.map((col) => (
      <th
        key={col.key}
        className="p-3 border border-blue-800 cursor-pointer hover:bg-blue-700 transition"
        onClick={() => handleSort(col.key)}
      >
        <div className="flex items-center justify-between">
          {col.label}
          {sortKey === col.key ? (
            sortOrder === "asc" ? (
              <ChevronUp size={16} className="text-yellow-300" />
            ) : (
              <ChevronDown size={16} className="text-yellow-300" />
            )
          ) : (
            <ChevronUp size={16} className="text-white" />
          )}
        </div>
      </th>
    ))}
    <th className="p-3 border border-blue-800 rounded-tr-md">OPT</th>
  </tr>
</thead>
          <tbody>
            {displayedInnovations.length > 0 ? (
              displayedInnovations.map((innovation, index) => (
                <tr key={innovation.id} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{innovation.type}</td>
                  <td className="p-3 border">{innovation.title}</td>
                  <td className="p-3 border">{innovation.date}</td>
                  <td className="p-3 border">{innovation.role}</td>
                  <td className="p-3 border">
                    <a
                      href={innovation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {innovation.url}
                    </a>
                  </td>
                  <td className="p-3 border text-center">
                    <button className="text-red-500 hover:text-red-700 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="text-center p-4 text-gray-500">
                  No matching innovations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InnovationProductList;