// src/utils/search.js
import Fuse from 'fuse.js';
import { getContentfulProducts, getContentfulProductBySlug, getAllProductCategories } from './contentful';

// Cache for products to avoid multiple API calls
let productsCache = null;

/**
 * Get all products from Contentful
 * @returns {Promise<Array>} All products
 */
export const getAllProducts = async () => {
  if (productsCache) {
    return productsCache;
  }
  
  productsCache = await getContentfulProducts();
  return productsCache;
};

/**
 * Search products based on a query
 * @param {string} query - Search query
 * @param {string} locale - Current locale (en or zh)
 * @returns {Promise<Array>} Search results
 */
export const searchProducts = async (query, locale = 'en') => {
  if (!query) return [];
  
  const products = await getAllProducts();
  
  const options = {
    includeScore: true,
    threshold: 0.4,
    keys: [
      `title.${locale}`,
    ]
  };
  
  const fuse = new Fuse(products, options);
  const results = fuse.search(query);
  
  return results.map(result => result.item);
};

/**
 * Get a single product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Object|null>} Product or null if not found
 */
export const getProductBySlug = async (slug) => {
  // First check cache if available
  if (productsCache) {
    const product = productsCache.find(product => product.slug === slug);
    if (product) return product;
  }
  
  // If not in cache or not found, get directly from Contentful
  return await getContentfulProductBySlug(slug);
};

/**
 * Filter products by category
 * @param {Array} products - Array of products
 * @param {string} category - Category to filter by
 * @param {string} locale - Current locale (en or zh)
 * @returns {Array} Filtered products
 */
export const filterProductsByCategory = (products, category, locale = 'en') => {
  if (!category || category === 'all') {
    return products;
  }
  
  // Define category translations for matching both ways
  const categoryTranslations = {
    // English to Chinese
    "Embedded touch display": "嵌入式触摸屏",
    "Industry / Commerce": "工业/商业",
    "Advertising machine": "广告机",
    "Conference educational equipment": "会议教育设备",
    "Terminal communication equipment": "终端通讯设备",
    "Security surveillance camera": "安防摄像机",
    "Television": "电视",
    
    // Chinese to English
    "嵌入式触摸屏": "Embedded touch display",
    "工业/商业": "Industry / Commerce",
    "广告机": "Advertising machine",
    "会议教育设备": "Conference educational equipment",
    "终端通讯设备": "Terminal communication equipment",
    "安防摄像机": "Security surveillance camera",
    "电视": "Television"
  };
  
  return products.filter(product => {
    if (!product.categories) return false;
    
    // For Chinese interface, we need to check both Chinese and English categories
    if (locale === 'zh') {
      // Check if the product has the Chinese category directly
      if (product.categories.includes(category)) return true;
      
      // Check if the product has the corresponding English category
      const englishCategory = categoryTranslations[category];
      if (englishCategory && product.categories.includes(englishCategory)) return true;
    } else {
      // For English interface
      if (product.categories.includes(category)) return true;
      
      // Check if the product has the corresponding Chinese category
      const chineseCategory = categoryTranslations[category];
      if (chineseCategory && product.categories.includes(chineseCategory)) return true;
    }
    
    return false;
  });
};

/**
 * Filter products by multiple categories
 * @param {Array} products - Array of products
 * @param {Array} categories - Categories to filter by
 * @param {string} locale - Current locale (en or zh)
 * @returns {Array} Filtered products
 */
export const filterProductsByCategories = (products, categories, locale = 'en') => {
  if (!categories || categories.length === 0) {
    return products;
  }
  
  return products.filter(product => {
    if (!product.categories) return false;
    
    return categories.some(category => 
      filterProductsByCategory([product], category, locale).length > 0
    );
  });
};

/**
 * Get a paginated subset of products
 * @param {Array} products - Array of products
 * @param {number} page - Current page number (starting from 1)
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} - Object with paginated products, total pages, etc.
 */
export const getPaginatedProducts = (products, page = 1, itemsPerPage = 6) => {
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  // Calculate indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  // Get paginated items
  const paginatedItems = products.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

/**
 * Get all available categories
 * @returns {Promise<Object>} Object with categories in both languages
 */
export const getProductCategories = async () => {
  return await getAllProductCategories();
};

export default {
  getAllProducts,
  searchProducts,
  getProductBySlug,
  filterProductsByCategory,
  filterProductsByCategories,
  getPaginatedProducts,
  getProductCategories
};