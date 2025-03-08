import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";




export const staffs = [
  {name:"Sarah J. Thompson", id:"0000-0002-1825-0097", dept:"Department of Mechanical Engineering, Chennai Institute of Technology", email:"sarah.thompson@example.com"},
  {name:"John Doe", id:"0000-0002-1825-0098", dept:"Department of Computer Science, Chennai Institute of Technology", email:"john.doe@example.com"},
  {name:"Jane Doe", id:"0000-0002-1825-0099", dept:"Department of Electrical Engineering, Chennai Institute of Technology", email:"jane.doe@example.com"},
  {name:"John Smith", id:"0000-0002-1825-0100", dept:"Department of Mechanical Engineering, Chennai Institute of Technology", email:"john.smith@example.com"}
];

// Multi-Select Dropdown Component
const MultiSelectDropdown = ({ 
  options, 
  selectedOptions, 
  onToggleOption, 
  placeholder, 
  filterKey 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative border border-purple-300 rounded" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 border rounded flex justify-between items-center"
      >
        <span className="truncate">
          {selectedOptions.length === 0 
            ? placeholder 
            : `${selectedOptions.length} selected`}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full bg-white rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label 
              key={option} 
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => onToggleOption(filterKey, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Active Filters Component
const ActiveFilters = ({ filters, onRemoveFilter, onClearAllFilters }) => {
  // Flatten filters into an array of active filters
  const activeFilters = Object.entries(filters)
    .flatMap(([key, values]) => 
      values.map(value => ({ type: key, value }))
    );

  if (activeFilters.length === 0) return null;


  return (
    <div className="bg-gray-100 p-3 rounded-lg mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium mr-2">Active Filters:</span>
        
        {activeFilters.map((filter, index) => (
          <div 
            key={`${filter.type}-${filter.value}`} 
            className={`
              flex items-center 
              px-3 py-1 rounded-full 
              text-sm 
              ${filter.type === 'dept' ? 'bg-blue-100 text-blue-800' : 
                filter.type === 'name' ? 'bg-green-100 text-green-800' : 
                'bg-gray-200 text-gray-800'}
            `}
          >
            <span className="mr-2">
              {filter.type === 'dept' ? 'Department' : 
               filter.type === 'name' ? 'Name' : filter.type}: 
              {filter.value}
            </span>
            <button 
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
        
        <button 
          onClick={onClearAllFilters}
          className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

const AuthorsList = () => {

  
  const navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    dept: [],
    name: []
  });

  // Extracting unique values for filters
  const uniqueDepartments = [...new Set(staffs.map(staff => staff.dept))];
  const uniqueNames = [...new Set(staffs.map(staff => staff.name))];

  // Toggle filter selection
  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  // Remove a specific filter
  const removeFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({ dept: [], name: [] });
    setSearchTerm("");
  };

  // Filter function
  const filteredStaff = staffs.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDeptFilter = 
      filters.dept.length === 0 || 
      filters.dept.includes(staff.dept);

    const matchesNameFilter = 
      filters.name.length === 0 || 
      filters.name.includes(staff.name);

    return matchesSearch && matchesDeptFilter && matchesNameFilter;
  });

  return (
    <div className="max-w-5xl pr-4">
      {/* Search Input */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Authors List</h2>
      <div className="mb-4 relative">
        <input 
          type="text" 
          placeholder="Search staff..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded"
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path d="M21 21l-4.35-4.35" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-4 mb-4 bg-white p-2 rounded-lg shadow">
        <div className='w-60'>
        <MultiSelectDropdown
          options={uniqueDepartments}
          selectedOptions={filters.dept}
          onToggleOption={toggleFilter}
          placeholder="Select Departments"
          filterKey="dept"
        />
        </div>
        <div className='w-60'>
        <MultiSelectDropdown
          options={uniqueNames}
          selectedOptions={filters.name}
          onToggleOption={toggleFilter}
          placeholder="Select Names"
          filterKey="name"
        />
        </div>
      </div>

      {/* Active Filters Component */}
      <ActiveFilters 
        filters={filters}
        onRemoveFilter={removeFilter}
        onClearAllFilters={clearAllFilters}
      />

      {/* Staff List */}
      <div className="space-y-4">
        {filteredStaff.map((staff, index) => (
          <div 
            key={index} 
            className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow"
            onClick={()=>navigate("/author/1")}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold uppercase">
                    {staff.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
                <p className="text-sm text-gray-500">{staff.dept}</p>
              </div>
              <div className="text-sm text-gray-600">{staff.id}</div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results State */}
      {filteredStaff.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto mb-4 text-gray-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>No staff members found matching your search and filters</p>
        </div>
      )}
    </div>
  );
};

export default AuthorsList;