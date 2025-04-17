// src/utils/search.js
import Fuse from 'fuse.js';
import { getContentfulProducts, getContentfulProductBySlug } from './contentful';

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
