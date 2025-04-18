// src/components/ui/SimpleCategoryFilter.js
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const SimpleCategoryFilter = ({ categories, selectedCategory, onChange }) => {
  const { i18n } = useTranslation('common');
  const locale = i18n.language;
  const router = useRouter();

  const handleCategoryChange = (category) => {
    // Update URL with selected category and reset to page 1
    const query = { ...router.query };
    
    if (category === 'all') {
      delete query.category;
    } else {
      query.category = category;
    }
    
    query.page = 1; // Reset to first page
    
    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true, scroll: false }); // Prevent scrolling
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* "All" button */}
      <button 
        onClick={() => handleCategoryChange('all')}
        className={`px-4 py-2 rounded-md transition-colors ${
          selectedCategory === 'all' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        {locale === 'en' ? 'All' : '全部'}
      </button>
      
      {/* Category buttons */}
      {categories.map((category) => (
        <button 
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedCategory === category 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SimpleCategoryFilter;