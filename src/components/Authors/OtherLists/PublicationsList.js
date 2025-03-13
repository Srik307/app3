import React, { useState } from "react";
import { articles } from "../../../sampledata";
import { useNavigate } from "react-router-dom";
import { XCircle, ChevronUp, ChevronDown } from "lucide-react";

const AuthorPublications = () => {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 1;

  const handleSort = (key) => {
    setSortOrder((prevOrder) =>
      sortKey === key && prevOrder === "asc" ? "desc" : "asc"
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

  const filteredArticles = articles.filter(
    (article) =>
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.authors.some((author) =>
          author.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (filters.length === 0 ||
        filters.includes(article.publication_year.toString()))
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortOrder === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  const displayedArticles = isExpanded
    ? sortedArticles
    : sortedArticles.slice(0, initialCount);



    const renderTags = (article) => {
        const tags = [];
        ["SCS", "WOS", "INCI", "PBM", "IEEE", "GSC", "NID"].forEach((field) => {
          if (article[field]) {
            tags.push(
              <span
                key={field}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
              >
                {field}
              </span>
            );
          }
        });
        return tags;
      };

  return (
    <div className="max-w-7xl  mt-6 p-6 bg-white shadow-lg rounded-lg border">
      <div className="flex flex-wrap items-center justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-blue-800">Publications</h2>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />


<select
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by Year</option>
          {[...new Set(articles.map((article) => article.publication_year))].map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>

        <select
          value={sortKey || ""}
          onChange={(e) => handleSort(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by</option>
          <option value="title">Publication Details</option>
          <option value="publication_year">Year</option>
        </select>

        <select
          value={sortOrder}
          onChange={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="border px-4 py-2 rounded shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        
              {/* View More/View Less Button */}
      {sortedArticles.length > initialCount && (
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

      {/* Filters and Sorting */}
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

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-blue-900 text-white text-sm uppercase">
        <th className="border p-3 rounded-tl-md">NO</th>
        <th
          className="border p-3 cursor-pointer hover:bg-blue-700 transition"
          onClick={() => handleSort("title")}
        >
          <div className="flex items-center justify-between">
            PUBLICATION DETAILS
            {sortKey === "title" && (
              sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </div>
        </th>
        <th
          className="border p-3 cursor-pointer hover:bg-blue-700 transition"
          onClick={() => handleSort("publication_year")}
        >
          <div className="flex items-center justify-between">
            YEAR
            {sortKey === "publication_year" && (
              sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </div>
        </th>
        <th className="border p-3 cursor-pointer hover:bg-blue-700 transition">
            <div className="flex items-center justify-between">
            Authors
            {sortKey === "publication_year" && (
              sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
            )}
          </div></th>
        <th className="border p-3">TAGS</th>
        <th className="border p-3 ">Status</th>
      </tr>
    </thead>
    <tbody>
      {displayedArticles.length > 0 ? (
        displayedArticles.map((article, index) => (
          <tr
            key={article.id}
            className="even:bg-gray-50 hover:bg-blue-50 transition"
          >
            <td className="border p-3 text-center">{index + 1}</td>
            <td className="border p-3 min-w-[400px]">
              <span
                onClick={() => navigate(`/papers/${article.id}`)}
                className="text-blue-600 text-sm font-bold cursor-pointer hover:underline block"
              >
                {article.title}
              </span>
              <span
                className="text-green-600 text-xs"
              >
                {article.journal}
              </span>
            </td>
            <td className="border p-3">
                {article.authors.map((author, index) => (
              <span
                onClick={() => navigate(`/authors/${article.id}`)}
                className="font-medium text-sm cursor-pointer hover:underline"
              >{author} {index < article.authors.length - 1 && ", "}
              </span>)
                )}
            </td>
            <td className="border p-3 text-center">{article.publication_year}</td>
            <td className="border px-1 py-2 w-56">
              <div className="flex flex-wrap space-y-1 items-center max-w-[220px]">
                {renderTags(article)}
              </div>
            </td>
            <td className="border p-3">
            <span
                className="text-sm"
              >
                {article.STATUS}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="4"
            className="text-center p-4 text-gray-500 bg-gray-100 rounded-b-md"
          >
            No matching articles found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AuthorPublications;