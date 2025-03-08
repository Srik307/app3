import React, { useState, useEffect } from "react";
import { X, GripVertical } from "lucide-react"; // Close & Drag icons

const SideBar = ({ isOpen,setIsOpen }) => {
  const [selectedPatent, setSelectedPatent] = useState({
    id: 1,
    title: "Autonomous Drone Delivery System",
    inventors: ["John Doe", "Jane Smith"],
    assignee: "Tech Innovations Inc.",
    filing_date: "2023-05-12",
    grant_date: "2024-02-20",
    abstract:
      "An autonomous drone delivery system designed to transport goods to designated locations using AI-driven navigation and obstacle avoidance.",
    publication_year: 2024,
    citations: 15,
  });

  const [width, setWidth] = useState(isOpen!=null ? 1000 : 600);
  const [resizing, setResizing] = useState(false);

  const handleMouseMove = (e) => {
    if (!resizing) return;
    const newWidth = window.innerWidth - e.clientX;
    setWidth(Math.max(300, Math.min(newWidth, 900)));
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  useEffect(() => {
    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  return (
    <div
      className="h-screen absolute top-0 right-0 shadow-lg text-white overflow-hidden z-50 bg-gray-900 transition-all duration-100 border-l border-gray-700"
      style={{ width: isOpen!=null?`${width}px`:0 }}
    >
      {/* Draggable Handle Button */}
      <div
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-12 flex items-center justify-center bg-gray-700 rounded-full cursor-ew-resize hover:bg-gray-600"
        onMouseDown={() => setResizing(true)}
      >
        <GripVertical size={16} className="text-gray-300" />
      </div>

      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
          <h3 className="text-xl font-semibold text-white">Patent Details</h3>
          <button
            onClick={() => {setIsOpen(null)}}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {selectedPatent ? (
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div>
              <h4 className="text-lg font-semibold text-gray-300">Title</h4>
              <p className="text-gray-400">{selectedPatent.title}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300">Inventors</h4>
              <p className="text-gray-400">{selectedPatent.inventors.join(", ")}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300">Assignee</h4>
              <p className="text-gray-400">{selectedPatent.assignee}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-300">Filing Date</h4>
                <p className="text-gray-400">{selectedPatent.filing_date}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-300">Grant Date</h4>
                <p className="text-gray-400">{selectedPatent.grant_date}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-300">Abstract</h4>
              <p className="text-gray-400 leading-relaxed">{selectedPatent.abstract}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Select a patent to view details</p>
        )}

        {/* Close Button */}
        <button
          onClick={() => {setIsOpen(null)} }
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-center transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SideBar;
