import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

const MembershipList = () => {
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

  const membership = [
    {
      id: 1,
      society: "IEEE",
      memberSince: "2020-01-01",
      type: "Professional",
      role: "Member",
    },
    {
      id: 2,
      society: "ACM",
      memberSince: "2021-02-15",
      type: "Academic",
      role: "Chair",
    },
    {
      id: 3,
      society: "Tech Society",
      memberSince: "2022-03-10",
      type: "Community",
      role: "Advisor",
    },
    {
      id: 4,
      society: "AI Alliance",
      memberSince: "2023-04-20",
      type: "Professional",
      role: "Member",
    },
  ];

  const filteredMembership = membership.filter(
    (item) =>
      item.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.memberSince.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMembership = [...filteredMembership].sort((a, b) => {
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

  const displayedMembership = isExpanded ? sortedMembership : sortedMembership.slice(0, 1);

  const columns = [
    { key: "society", label: "NAME OF SOCIETY" },
    { key: "memberSince", label: "MEMBER SINCE" },
    { key: "type", label: "TYPE" },
    { key: "role", label: "ROLE" },
  ];

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Membership</h2>
        <input
        type="text"
        placeholder="Search by society, member since, type, or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
      />
        {sortedMembership.length > 2 && (
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
            {displayedMembership.length > 0 ? (
              displayedMembership.map((item, index) => (
                <tr key={item.id} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{item.society}</td>
                  <td className="p-3 border">{item.memberSince}</td>
                  <td className="p-3 border">{item.type}</td>
                  <td className="p-3 border">{item.role}</td>
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
                  No matching memberships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipList;