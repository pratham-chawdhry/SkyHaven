import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currentPage - 1);
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors`}
            style={{ border : "1px solid #CFD9E0", color : `${currentPage === i ? "black" : "#CFD9E0"}`, backgroundColor : `${currentPage === i ? "#F6F6F6" : "white"}` }}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center space-x-2 mb-5" aria-label="Pagination">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        className={`h-10 px-4 rounded-lg flex items-center transition-colors
          ${currentPage === 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="ml-2 hidden sm:inline">Previous</span>
      </button>
      
      <div className="flex items-center space-x-2">
        {renderPageNumbers()}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        className={`h-10 px-4 rounded-lg flex items-center transition-colors
          ${currentPage === totalPages - 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        aria-label="Next page"
      >
        <span className="mr-2 hidden sm:inline">Next</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;
