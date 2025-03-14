import React,{useEffect,useState} from 'react';


const articlesData=[
  {
    "Publication Title": "Deep Learning for Image Classification",
    "SCS": "ABC123",
    "WoS": "WOS123456",
    "PM": "PM456789",
    "IEEE": "IEEE1234",
    "GS": "GS567890",
    "UGC": "UGC111222",
    "UGC group": "Science",
    "Source Title": "Journal of Machine Learning",
    "Level": "A",
    "Article Type": "Research Article",
    "Year": 2023,
    "Month": "March",
    "Online Date": "2023-03-15",
    "Print Date": "2023-03-18",
    "Home author Name": "John Doe",
    "Dept": "Computer Science",
    "College": "XYZ University",
    "Email": "john.doe@xyz.edu",
    "Vol": 25,
    "No": 3,
    "ISS No": 7890,
    "B Page": 45,
    "E Page": 59,
    "SNIP": 2.1,
    "SJR": 1.8,
    "IF": 3.2,
    "CITE Score": 120,
    "P ISSN": "1234-5678",
    "E ISSN": "8765-4321",
    "P ISBN": "978-0-123-45678-9",
    "E ISBN": "978-1-234-56789-0",
    "Subject Area": "Computer Science",
    "Link": "https://example.com/article/1234",
    "DOI": "10.1234/jml.2023.5678"
  },
  {
    "Publication Title": "Quantum Computing Advancements",
    "SCS": "DEF456",
    "WoS": "WOS987654",
    "PM": "PM654321",
    "IEEE": "IEEE5678",
    "GS": "GS432109",
    "UGC": "UGC333444",
    "UGC group": "Engineering",
    "Source Title": "Journal of Quantum Computing",
    "Level": "B",
    "Article Type": "Review Article",
    "Year": 2022,
    "Month": "October",
    "Online Date": "2022-10-05",
    "Print Date": "2022-10-12",
    "Home author Name": "Jane Smith",
    "Dept": "Electrical Engineering",
    "College": "ABC Institute",
    "Email": "jane.smith@abc.edu",
    "Vol": 15,
    "No": 4,
    "ISS No": 1234,
    "B Page": 100,
    "E Page": 120,
    "SNIP": 1.5,
    "SJR": 2.0,
    "IF": 4.0,
    "CITE Score": 200,
    "P ISSN": "2345-6789",
    "E ISSN": "9876-5432",
    "P ISBN": "978-0-234-56789-0",
    "E ISBN": "978-1-234-56789-1",
    "Subject Area": "Engineering",
    "Link": "https://example.com/article/9876",
    "DOI": "10.9876/jqc.2022.1234"
  },
  {
    "Publication Title": "Sustainable Energy Systems",
    "SCS": "GHI789",
    "WoS": "WOS112233",
    "PM": "PM223344",
    "IEEE": "IEEE91011",
    "GS": "GS564738",
    "UGC": "UGC555666",
    "UGC group": "Environmental Science",
    "Source Title": "Journal of Renewable Energy",
    "Level": "C",
    "Article Type": "Research Article",
    "Year": 2024,
    "Month": "January",
    "Online Date": "2024-01-20",
    "Print Date": "2024-01-25",
    "Home author Name": "Michael Johnson",
    "Dept": "Environmental Science",
    "College": "Green University",
    "Email": "michael.johnson@green.edu",
    "Vol": 30,
    "No": 1,
    "ISS No": 4567,
    "B Page": 10,
    "E Page": 25,
    "SNIP": 1.9,
    "SJR": 1.7,
    "IF": 2.8,
    "CITE Score": 150,
    "P ISSN": "3456-7890",
    "E ISSN": "8765-4321",
    "P ISBN": "978-0-345-67890-1",
    "E ISBN": "978-1-234-56789-2",
    "Subject Area": "Environmental Science",
    "Link": "https://example.com/article/1122",
    "DOI": "10.1122/jre.2024.9876"
  }
];

const ArticlesList = () => {
  const [publications, setPublications] = useState(articlesData);
  const [expandedId, setExpandedId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'Year', direction: 'desc' });
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique values for filter options
  const getFilterOptions = () => {
    const options = {};
    const filterableFields = ['Level', 'Article Type', 'Year', 'Subject Area', 'UGC group'];
    
    filterableFields.forEach(field => {
      const uniqueValues = [...new Set(articlesData.map(pub => String(pub[field])))];
      options[field] = ['All', ...uniqueValues.sort()];
    });
    
    return options;
  };
  
  const filterOptions = getFilterOptions();

  // Apply filters and sorting
  useEffect(() => {
    let filteredData = [...articlesData];
    
    // Apply all active filters
    Object.keys(filters).forEach(filterKey => {
      if (filters[filterKey] && filters[filterKey] !== 'All') {
        filteredData = filteredData.filter(pub => 
          String(pub[filterKey]) === String(filters[filterKey])
        );
      }
    });
    
    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        // Handle numeric values
        if (!isNaN(a[sortConfig.key]) && !isNaN(b[sortConfig.key])) {
          const aValue = Number(a[sortConfig.key]);
          const bValue = Number(b[sortConfig.key]);
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        // Handle string values
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setPublications(filteredData);
  }, [filters, sortConfig, articlesData]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case "A": return "bg-green-100 text-green-800";
      case "B": return "bg-blue-100 text-blue-800";
      case "C": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Publications ({publications.length})</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filter Publications</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.keys(filterOptions).map(filterKey => (
              <div key={filterKey}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{filterKey}</label>
                <select
                  value={filters[filterKey] || 'All'}
                  onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  {filterOptions[filterKey].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sort Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-700">Sort by:</h2>
          <div className="flex flex-wrap gap-2">
            {['Year', 'Level', 'IF', 'CITE Score', 'Publication Title'].map(key => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className={`px-3 py-1 rounded text-sm ${sortConfig.key === key ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {key}
                {sortConfig.key === key && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Publications List */}
      {publications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No publications match your filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {publications.map((publication, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header section */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-2">
                  <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{publication["Publication Title"]}</h1>
                <p className="text-lg font-medium text-gray-600 mb-2">{publication["Source Title"]}</p>
                  </div>
                  <div >
                    <p className="font-medium">{publication["Home author Name"]}</p>
                    <p className="text-sm text-gray-600">{publication.Dept}, {publication.College}</p>
                    <p className="text-sm text-gray-600">{publication.Email}</p>
                  </div>
                  <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadgeColor(publication.Level)}`}>
                    Level {publication.Level}
                  </span>
                    <p className="text-sm text-gray-500">{publication.Month} {publication.Year}</p>
                    <p className="text-sm text-gray-500">DOI: {publication.DOI}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4 w-full">

                  <div className='flex space-x-5 items-end'>

                      <div className="text-right">
                                    <p className="font-medium">Impact Factor: {publication.IF}</p>
                                    <p className="text-sm">Citations: {publication["CITE Score"]}</p>
                      </div>

                      <button 
                    onClick={() => toggleExpanded(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    {expandedId === index ? "Show less" : "Show more details"}
                    <svg 
                      className={`ml-1 h-4 w-4 transform ${expandedId === index ? "rotate-180" : ""}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                        
                   </div>

                   <a 
                    href={publication.Link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    View Publication
                  </a>

                <div>
                </div>
                </div>
                
              </div>
              
              {/* Details section */}
              {expandedId === index && (
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold border-b pb-2 mb-3">Publication Details</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Article Type:</div>
                        <div className="text-sm font-medium">{publication["Article Type"]}</div>
                        
                        <div className="text-sm text-gray-600">Volume:</div>
                        <div className="text-sm font-medium">{publication.Vol}</div>
                        
                        <div className="text-sm text-gray-600">Number:</div>
                        <div className="text-sm font-medium">{publication.No}</div>
                        
                        <div className="text-sm text-gray-600">Pages:</div>
                        <div className="text-sm font-medium">{publication["B Page"]}-{publication["E Page"]}</div>
                        
                        <div className="text-sm text-gray-600">Online Date:</div>
                        <div className="text-sm font-medium">{publication["Online Date"]}</div>
                        
                        <div className="text-sm text-gray-600">Print Date:</div>
                        <div className="text-sm font-medium">{publication["Print Date"]}</div>
                        
                        <div className="text-sm text-gray-600">Subject Area:</div>
                        <div className="text-sm font-medium">{publication["Subject Area"]}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold border-b pb-2 mb-3">Identifiers & Metrics</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">SCS:</div>
                        <div className="text-sm font-medium">{publication.SCS}</div>
                        
                        <div className="text-sm text-gray-600">WoS:</div>
                        <div className="text-sm font-medium">{publication.WoS}</div>
                        
                        <div className="text-sm text-gray-600">IEEE:</div>
                        <div className="text-sm font-medium">{publication.IEEE}</div>
                        
                        <div className="text-sm text-gray-600">SNIP:</div>
                        <div className="text-sm font-medium">{publication.SNIP}</div>
                        
                        <div className="text-sm text-gray-600">SJR:</div>
                        <div className="text-sm font-medium">{publication.SJR}</div>
                        
                        <div className="text-sm text-gray-600">P ISSN:</div>
                        <div className="text-sm font-medium">{publication["P ISSN"]}</div>
                        
                        <div className="text-sm text-gray-600">E ISSN:</div>
                        <div className="text-sm font-medium">{publication["E ISSN"]}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;