import React, { useState } from "react";
import { XCircle } from "lucide-react";
import { projects } from "../../sampledata";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full relative">
        <button
          className="absolute top-2 right-3 text-gray-500 text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
        <p className="text-sm text-gray-500">Owner: {project.owner}</p>
        <p className="text-sm text-gray-500">Created: {new Date(project.created_at).toLocaleDateString()}</p>
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
            project.status === "Published"
              ? "bg-green-100 text-green-800"
              : project.status === "In Review"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {project.status}
        </span>
        <p className="mt-4 text-gray-700">{project.description}</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>👀 {project.analytics.views.toLocaleString()} views</p>
          <p>📥 {project.analytics.downloads.toLocaleString()} downloads</p>
          <p>📖 {project.analytics.citations.toLocaleString()} citations</p>
        </div>
      </div>
    </div>
  );
};

const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeFilters, setActiveFilters] = useState([]);

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value && !activeFilters.includes(value)) {
      setActiveFilters([...activeFilters, value]);
    }
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const filteredProjects = projects.filter(project =>
    (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeFilters.length === 0 || activeFilters.includes(project.status))
  ).sort((a, b) => {
    return sortOrder === "asc" ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey]);
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Projects</h1>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          className="px-4 py-1 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-1 border rounded-lg" onChange={handleSortChange} value={sortKey}>
          <option value="name">Sort by Name</option>
          <option value="created_at">Sort by Date</option>
        </select>
        <select className="px-4 py-2 border rounded-lg" onChange={handleFilterChange}>
          <option value="">Filter by Status</option>
          {[...new Set(projects.map(project => project.status))].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 mb-4">
        {activeFilters.map(filter => (
          <div key={filter} className="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center gap-2">
            {filter}
            <XCircle size={16} className="cursor-pointer" onClick={() => removeFilter(filter)} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-sm cursor-pointer" onClick={() => setSelectedProject(project)}>
          <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
          <p className="text-sm text-gray-500">Owner: {project.owner}</p>
          <p className="text-sm text-gray-500">Created: {new Date(project.created_at).toLocaleDateString()}</p>
        </div>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default ProjectList;