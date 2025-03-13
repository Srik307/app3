import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

const NewCourseContentList = () => {
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

  const courses = [
    {
      id: 1,
      title: "Intro to Python",
      date: "2023-05-10",
      platform: "Udemy",
      url: "https://udemy.com/intro-python",
      role: "Instructor",
    },
    {
      id: 2,
      title: "Web Development Basics",
      date: "2023-06-15",
      platform: "Coursera",
      url: "https://coursera.org/web-dev-basics",
      role: "Co-Instructor",
    },
    {
      id: 3,
      title: "Data Science 101",
      date: "2023-07-20",
      platform: "edX",
      url: "https://edx.org/data-science-101",
      role: "Content Creator",
    },
    {
      id: 4,
      title: "AI Fundamentals",
      date: "2023-08-25",
      platform: "LinkedIn Learning",
      url: "https://linkedin.com/ai-fundamentals",
      role: "Instructor",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
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

  const displayedCourses = isExpanded ? sortedCourses : sortedCourses.slice(0, 1);

  const columns = [
    { key: "title", label: "COURSE TITLE" },
    { key: "date", label: "DATE" },
    { key: "platform", label: "PUBLISHED PLATFORM" },
    { key: "url", label: "COURSE URL" },
    { key: "role", label: "ROLE" },
  ];

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-blue-800">New Course Content Development</h2>
        <input
        type="text"
        placeholder="Search by title, date, platform, url, or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
      />
        {sortedCourses.length > 2 && (
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
            {displayedCourses.length > 0 ? (
              displayedCourses.map((course, index) => (
                <tr key={course.id} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{course.title}</td>
                  <td className="p-3 border">{course.date}</td>
                  <td className="p-3 border">{course.platform}</td>
                  <td className="p-3 border">
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {course.url}
                    </a>
                  </td>
                  <td className="p-3 border">{course.role}</td>
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
                  No matching courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewCourseContentList;