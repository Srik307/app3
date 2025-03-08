import React, { useState } from 'react';
import { patents } from '../../sampledata';
import { ChevronUp, ChevronDown, XCircle } from 'lucide-react';

const PatentList = ({setOpen}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState([]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle order
    } else {
      setSortKey(key);
      setSortOrder('desc'); // Default new sort to descending
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value && !filters.includes(value)) {
      setFilters([...filters, value]);
    }
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const filteredPatents = patents.filter(patent =>
    (patent.title.toLowerCase().includes(searchTerm.toLowerCase()) || patent.assignee.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patent.inventors.some(inventor => inventor.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filters.length === 0 || filters.includes(patent.grant_date.split("-")[0]))
  );

  const sortedPatents = [...filteredPatents].sort((a, b) => {
    if (!sortKey) return 0;
    return sortOrder === 'asc' ? (a[sortKey] > b[sortKey] ? 1 : -1) : (a[sortKey] < b[sortKey] ? 1 : -1);
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      {/* Search & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold text-gray-800">Patents</h2>
        <input
          type="text"
          placeholder="Search by title or inventor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-64"
        />
        </div>
        <select
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded shadow-sm"
        >
          <option value="">Filter by Year</option>
          {[...new Set(patents.map(patent => patent.grant_date.split("-")[0]))].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      <div className="flex gap-2 mb-4">
        {filters.map(filter => (
          <div key={filter} className="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center gap-2">
            {filter}
            <XCircle size={16} className="cursor-pointer" onClick={() => removeFilter(filter)} />
          </div>
        ))}
      </div>

      {/* Patent Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="border p-3">S.No.</th>
              {['title', 'inventors', 'assignee', 'filing_date', 'grant_date'].map((key) => (
                <th key={key} className="border p-3">
                  <div className="flex items-center">
                    {key.replace('_', ' ')}
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => handleSort(key)}
                    >
                      {sortKey === key ? (
                        sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      ) : (
                        <ChevronUp size={14} className="opacity-50" /> // Reset others to ChevronUp
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPatents.length > 0 ? (
              sortedPatents.map((patent, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="border p-3 text-center">{index + 1}</td>
                  <td className="border p-3 text-blue-600 font-bold cursor-pointer hover:underline" onClick={()=>setOpen("patent")}>{patent.title}</td>
                  <td className="border p-3">{patent.inventors.join(", ")}</td>
                  <td className="border p-3">{patent.assignee}</td>
                  <td className="border p-3 text-center">{patent.filing_date}</td>
                  <td className="border p-3 text-center">{patent.grant_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">No matching patents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatentList;
