// src/components/ui/Pagination.js
import { useRouter } from 'next/router';

const Pagination = ({ 
  totalItems, 
  itemsPerPage = 6, 
  currentPage = 1, 
  onPageChange 
}) => {
  const router = useRouter();
  
  // Calculate total pages needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Create page numbers array
  const pageNumbers = [];
  
  // Determine which page numbers to show (always show max 5 pages)
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  // Adjust if we're near the end
  if (endPage - startPage < 4 && totalPages > 5) {
    startPage = Math.max(1, endPage - 4);
  }
  
  // Generate page numbers to display
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    // If using URL-based pagination
    if (!onPageChange) {
      const query = { ...router.query, page };
      router.push({
        pathname: router.pathname,
        query,
      }, undefined, { 
        scroll: false,
        shallow: true  // Add shallow option to prevent full page refresh
      });
      return;
    }
    
    // For callback-based pagination (if implemented later)
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Previous page"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
        
        {/* Page 1 link (always visible) */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 py-1 text-gray-500">...</span>
            )}
          </>
        )}
        
        {/* Page number buttons */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`px-4 py-2 rounded-md ${
              currentPage === number
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {number}
          </button>
        ))}
        
        {/* Last page link (always visible) */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 py-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Next button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Next page"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;