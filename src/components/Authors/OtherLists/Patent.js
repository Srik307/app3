import React, { useState } from 'react';
import { patents } from '../../../sampledata';
import { ChevronUp, ChevronDown, XCircle } from 'lucide-react';

const AuthorPatentList = ({ setOpen }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 1;

  const handleSort = (key) => {
    setSortOrder((prevOrder) =>
      sortKey === key && prevOrder === 'asc' ? 'desc' : 'asc'
    );
    setSortKey(key);
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

  const filteredPatents = patents.filter(
    (patent) =>
      (patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patent.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patent.inventors.some((inventor) =>
          inventor.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (filters.length === 0 || filters.includes(patent.grant_date.split('-')[0]))
  );

  const sortedPatents = [...filteredPatents].sort((a, b) => {
    if (!sortKey) return 0;
    let aValue = a[sortKey];
    let bValue = b[sortKey];
    if (Array.isArray(aValue)) aValue = aValue[0] || '';
    if (Array.isArray(bValue)) bValue = bValue[0] || '';
    return sortOrder === 'asc'
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  const displayedPatents = isExpanded
    ? sortedPatents
    : sortedPatents.slice(0, initialCount);

  return (
    <div className="max-w-7xl mt-6 p-6 bg-white shadow-lg rounded-lg border">
      {/* Search Controls */}
      <div className="flex flex-wrap items-center justify-between items-center gap-4">
      <h2 className="text-2xl font-bold text-blue-800">Patents</h2>
        <input
          type="text"
          placeholder="Search by title or inventor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />
                <select
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Filter by Year</option>
          {[...new Set(patents.map((patent) => patent.grant_date.split('-')[0]))].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      {/* View More/View Less Button */}
      {sortedPatents.length > initialCount && (
        <div className="text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isExpanded ? "View Less" : "View More"}
          </button>
        </div>
      )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-3">

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

      {/* Patent Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white text-sm uppercase">
              <th className="border p-3 rounded-tl-md">NO</th>
              <th
                className="border p-3 cursor-pointer hover:bg-blue-700 transition"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center justify-between">
                  PATENT DETAILS
                  {sortKey === 'title' && (
                    sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th
                className="border p-3 cursor-pointer hover:bg-blue-700 transition"
                onClick={() => handleSort('inventors')}
              >
                <div className="flex items-center justify-between">
                  INVENTORS
                  {sortKey === 'inventors' && (
                    sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th
                className="border p-3 cursor-pointer hover:bg-blue-700 transition"
                onClick={() => handleSort('filing_date')}
              >
                <div className="flex items-center justify-between">
                  FILING DATE
                  {sortKey === 'filing_date' && (
                    sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th
                className="border p-3 cursor-pointer hover:bg-blue-700 transition rounded-tr-md"
                onClick={() => handleSort('grant_date')}
              >
                <div className="flex items-center justify-between">
                  GRANT DATE
                  {sortKey === 'grant_date' && (
                    sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedPatents.length > 0 ? (
              displayedPatents.map((patent, index) => (
                <tr key={patent.id} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td className="border p-3 text-center">{index + 1}</td>
                  <td className="border p-3">
                    <span
                      onClick={() => setOpen('patent')}
                      className="text-blue-600 font-bold cursor-pointer hover:underline block"
                    >
                      {patent.title}
                    </span>
                    <span className="text-green-600 text-xs">{patent.assignee}</span>
                  </td>
                  <td className="border p-3">
                    {patent.inventors.map((inventor, idx) => (
                      <span key={idx} className="font-medium text-sm">
                        {inventor}
                        {idx < patent.inventors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td className="border p-3 text-center">{patent.filing_date}</td>
                  <td className="border p-3 text-center">{patent.grant_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500 bg-gray-100 rounded-b-md">
                  No matching patents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AuthorPatentList;