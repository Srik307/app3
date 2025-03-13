import { useState } from "react";
import { ChevronUp, ChevronDown, XCircle, Trash2 } from "lucide-react";

const CollaborativeTable = () => {
  // State declarations
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);

  // Sample data
  const rows = [
    {
      id: 1,
      type: "MOU",
      name: "Company X",
      country: "USA",
      purpose: "Research",
      date: "2025-03-10",
      status: "Active",
    },
    {
      id: 2,
      type: "Agreement",
      name: "Company Y",
      country: "UK",
      purpose: "Technology",
      date: "2025-02-15",
      status: "Pending",
    },
    {
      id: 3,
      type: "Contract",
      name: "Company Z",
      country: "Germany",
      purpose: "Innovation",
      date: "2025-01-05",
      status: "Completed",
    },
  ];

  // Event handlers
  const toggleRows = () => setIsExpanded(!isExpanded);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value && !filters.includes(value)) {
      setFilters([...filters, value]);
    }
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  // Data processing
  const uniqueStatuses = [...new Set(rows.map((row) => row.status))];

  const filteredRows = rows.filter(
    (row) =>
      (row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.length === 0 || filters.includes(row.status))
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    return sortOrder === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  const displayedRows = isExpanded ? sortedRows : sortedRows.slice(0, 1);

  // JSX rendering
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      {/* Search and Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-blue-800">Collaborative Activities</h2>
        <input
          type="text"
          placeholder="Search by name or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />
                <select
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Filter by Status</option>
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
              {/* View More/View Less Button */}
      {sortedRows.length > 1 && (
        <div className="text-center">
          <button
            onClick={toggleRows}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        </div>
      )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        {filters.map((filter) => (
          <div
            key={filter}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center gap-2"
          >
            {filter}
            <XCircle
              size={16}
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => removeFilter(filter)}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="relative overflow-hidden border border-gray-300 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white text-sm uppercase">
              <th className="p-3 border border-blue-800 rounded-tl-md">NO</th>
              {["type", "name", "country", "purpose", "date", "status"].map(
                (key) => (
                  <th
                    key={key}
                    className="p-3 border border-blue-800 cursor-pointer hover:bg-blue-700 transition"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center justify-between">
                      {key.toUpperCase().replace("_", " ")}
                      {sortKey === key && (
                        sortOrder === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      )}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {displayedRows.length > 0 ? (
              displayedRows.map((row, index) => (
                <tr
                  key={row.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{row.type}</td>
                  <td className="p-3 border">{row.name}</td>
                  <td className="p-3 border">{row.country}</td>
                  <td className="p-3 border">{row.purpose}</td>
                  <td className="p-3 border text-center">{row.date}</td>
                  <td className="p-3 border text-center">{row.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No matching collaborative activities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Floating "Add" Button */}
        <button className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg border-4 border-white hover:bg-blue-700 transition">
          ➕
        </button>
      </div>


    </div>
  );
};

export default CollaborativeTable;