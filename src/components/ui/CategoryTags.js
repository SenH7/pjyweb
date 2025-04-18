// src/components/ui/CategoryTags.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const CategoryTags = ({ 
  categories, 
  selectedCategories = [], 
  onChange,
  maxInitialVisible = 5
}) => {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  
  // Determine which categories to show initially
  const visibleCategories = showAll 
    ? categories 
    : categories.slice(0, maxInitialVisible);
  
  const handleCategoryToggle = (category) => {
    // Toggle category selection
    let newSelected = [...selectedCategories];
    
    if (selectedCategories.includes(category)) {
      // Remove category
      newSelected = newSelected.filter(cat => cat !== category);
    } else {
      // Add category
      newSelected.push(category);
    }
    
    // Call onChange handler if provided
    if (onChange) {
      onChange(newSelected);
    }
    
    // Update URL query params
    if (newSelected.length > 0) {
      router.push({
        pathname: router.pathname,
        query: { 
          ...router.query, 
          categories: newSelected.join(','),
          page: 1 // Reset to first page
        }
      }, undefined, { shallow: true });
    } else {
      // Remove categories param if empty
      const { categories, ...restQuery } = router.query;
      router.push({
        pathname: router.pathname,
        query: {
          ...restQuery,
          page: 1 // Reset to first page
        }
      }, undefined, { shallow: true });
    }
  };
  
  const handleRemoveTag = (category) => {
    handleCategoryToggle(category);
  };
  
  return (
    <div className="mb-6">
      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder={locale === 'en' ? 'Hit enter to add a value' : '输入值并按回车键添加'}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              // Find closest matching category
              const inputValue = e.target.value.trim().toLowerCase();
              const matchingCategory = categories.find(cat => 
                cat.toLowerCase().includes(inputValue)
              );
              
              if (matchingCategory && !selectedCategories.includes(matchingCategory)) {
                handleCategoryToggle(matchingCategory);
              }
              
              e.target.value = '';
              e.preventDefault();
            }
          }}
        />
      </div>
      
      {/* Category tags with selection UI */}
      <div className="flex flex-wrap gap-3 mb-4">
        {visibleCategories.map(category => (
          <div 
            key={category} 
            className={`flex items-center rounded-md px-3 py-2 cursor-pointer transition-colors ${
              selectedCategories.includes(category)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleCategoryToggle(category)}
          >
            <div className="grid place-items-center mr-2">
              <svg 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </div>
            <span>{category}</span>
            {selectedCategories.includes(category) && (
              <button 
                className="ml-2 text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(category);
                }}
                aria-label={locale === 'en' ? `Remove ${category}` : `移除 ${category}`}
              >
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
        
        {/* Show more/less button if categories exceed maxInitialVisible */}
        {categories.length > maxInitialVisible && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100"
          >
            {showAll 
              ? (locale === 'en' ? 'Show Less' : '显示更少') 
              : locale === 'en' 
                ? `Show More (${categories.length - maxInitialVisible})` 
                : `显示更多 (${categories.length - maxInitialVisible})`
            }
          </button>
        )}
      </div>
      
      {/* Selected tags display */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map(category => (
            <div 
              key={`selected-${category}`}
              className="flex items-center bg-blue-100 text-blue-800 rounded-md px-3 py-1"
            >
              <span>{category}</span>
              <button 
                className="ml-2 text-blue-600 hover:text-blue-800"
                onClick={() => handleRemoveTag(category)}
                aria-label={locale === 'en' ? `Remove ${category}` : `移除 ${category}`}
              >
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
          ))}
          
          {selectedCategories.length > 0 && (
            <button
              onClick={() => {
                if (onChange) {
                  onChange([]);
                }
                // Clear categories from URL
                const { categories, ...restQuery } = router.query;
                router.push({
                  pathname: router.pathname,
                  query: restQuery
                }, undefined, { shallow: true });
              }}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              {locale === 'en' ? 'Clear All' : '清除全部'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryTags;