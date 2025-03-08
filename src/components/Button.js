import React from "react";

export const Button = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

