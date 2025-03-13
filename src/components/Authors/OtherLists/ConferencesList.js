import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

const ConferencesList = () => {
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

  const conferences = [
    {
      id: 1,
      name: "Tech Summit 2023",
      presentationType: "Keynote",
      eventType: "Conference",
      eventLevel: "International",
      role: "Speaker",
    },
    {
      id: 2,
      name: "AI Workshop 2024",
      presentationType: "Poster",
      eventType: "Workshop",
      eventLevel: "National",
      role: "Presenter",
    },
    {
      id: 3,
      name: "Data Science Seminar",
      presentationType: "Talk",
      eventType: "Seminar",
      eventLevel: "Regional",
      role: "Organizer",
    },
    {
      id: 4,
      name: "Innovation Forum 2023",
      presentationType: "Panel Discussion",
      eventType: "Conference",
      eventLevel: "International",
      role: "Panelist",
    },
  ];

  const filteredConferences = conferences.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.presentationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.eventLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedConferences = [...filteredConferences].sort((a, b) => {
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

  const displayedConferences = isExpanded ? sortedConferences : sortedConferences.slice(0, 1);

  const columns = [
    { key: "name", label: "NAME OF CONFERENCE / WORKSHOP / SEMINAR" },
    { key: "presentationType", label: "PRESENTATION TYPE" },
    { key: "eventType", label: "EVENT TYPE" },
    { key: "eventLevel", label: "EVENT LEVEL" },
    { key: "role", label: "ROLE" },
  ];

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Conferences</h2>
        <input
        type="text"
        placeholder="Search by name, presentation type, event type, level, or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
      />
        {sortedConferences.length > 2 && (
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
            {displayedConferences.length > 0 ? (
              displayedConferences.map((conference, index) => (
                <tr key={conference.id} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{conference.name}</td>
                  <td className="p-3 border">{conference.presentationType}</td>
                  <td className="p-3 border">{conference.eventType}</td>
                  <td className="p-3 border">{conference.eventLevel}</td>
                  <td className="p-3 border">{conference.role}</td>
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
                  No matching conferences found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConferencesList;