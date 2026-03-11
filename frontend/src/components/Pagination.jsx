import React from "react";

function Pagination({ page, pages, onPageChange }) {
  if (!pages || pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded font-medium ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-hover transition"
        }`}
      >
        Prev
      </button>

      <span className="text-gray-700 font-medium font-mono bg-gray-100 px-4 py-2 rounded">
        {page} / {pages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className={`px-4 py-2 rounded font-medium ${
          page === pages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-hover transition"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
