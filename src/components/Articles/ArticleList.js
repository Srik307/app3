import React, { useState } from 'react';
import { articles } from '../../sampledata';
import { useNavigate } from "react-router-dom";
import { XCircle } from 'lucide-react';

const ArticlesList = () => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState([]);

  const handleSort = (key) => {
    setSortOrder((prevOrder) => (sortKey === key && prevOrder === 'asc' ? 'desc' : 'asc'));
    setSortKey(key);
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

  const filteredArticles = articles.filter(article => 
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filters.length === 0 || filters.includes(article.publication_year.toString()))
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortOrder === 'asc') {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 bg-white shadow-xl rounded-lg">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Publications</h2>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-64"
        />
      </div>
      
      <div className="flex gap-2 mb-4">
      <select
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded shadow-sm"
        >
          <option value="">Filter by Year</option>
          {[...new Set(articles.map(article => article.publication_year))].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={sortKey || ''}
          onChange={(e) => handleSort(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm"
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="authors">Authors</option>
          <option value="publication_year">Year</option>
          <option value="citations">Citations</option>
        </select>
        <select
          value={sortOrder}
          onChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="border px-4 py-2 rounded shadow-sm"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        {filters.map(filter => (
          <div key={filter} className="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center gap-2">
            {filter}
            <XCircle size={16} className="cursor-pointer" onClick={() => removeFilter(filter)} />
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="border p-3">S.No.</th>
              <th className="border p-3 cursor-pointer" onClick={() => handleSort('title')}>Source Title</th>
              <th className="border p-3 cursor-pointer" onClick={() => handleSort('authors')}>Authors</th>
              <th className="border p-3 cursor-pointer" onClick={() => handleSort('publication_year')}>Year</th>
              <th className="border p-3 cursor-pointer" onClick={() => handleSort('citations')}>Citations</th>
            </tr>
          </thead>
          <tbody>
            {sortedArticles.length > 0 ? (
              sortedArticles.map((article, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="border p-3 text-center">{index + 1}</td>
                  <td className="border p-3">
                    <span 
                      onClick={() => navigate(`/papers/${article.id}`)} 
                      className="text-blue-600 font-bold cursor-pointer hover:underline"
                    >
                      {article.title}
                    </span>
                  </td>
                  <td className="border p-3">{article.authors.join(", ")}</td>
                  <td className="border p-3 text-center">{article.publication_year}</td>
                  <td className="border p-3 text-center">{article.citations}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">No matching articles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticlesList;