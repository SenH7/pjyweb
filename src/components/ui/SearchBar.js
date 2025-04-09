import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { searchProducts } from '../../utils/search';

const SearchBar = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSearch = async (e) => {
    e?.preventDefault();
    setIsSearching(true);
    
    if (query.trim() === '') {
      setResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }
    
    try {
      const searchResults = await searchProducts(query, i18n.language);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Debounce search input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query && query.trim()) {
        handleSearch();
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);
  
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setResults([]);
      setShowResults(false);
    }
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={t('search.placeholder')}
          className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label={t('search.placeholder')}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-colors"
          aria-label={t('search.button')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </form>
      
      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <svg 
                className="animate-spin h-6 w-6 mx-auto mb-2" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowResults(false)}
                  >
                    {product.title[i18n.language] || product.title.en}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              {t('search.noResults')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;