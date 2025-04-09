// src/utils/contentful.js
import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

/**
 * Get all products from Contentful
 * @returns {Promise<Array>} Array of products
 */
export const getContentfulProducts = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'product', // Content type ID in Contentful
      include: 2, // Include linked entries (up to 2 levels)
    });
    
    return response.items.map(item => transformProductData(item));
  } catch (error) {
    console.error('Error fetching products from Contentful:', error);
    return [];
  }
};

/**
 * Get a single product by slug
 * @param {string} slug - Product slug
 * @returns {Promise<Object|null>} Product or null if not found
 */
export const getContentfulProductBySlug = async (slug) => {
  try {
    const response = await client.getEntries({
      content_type: 'product',
      'fields.slug': slug,
      include: 2,
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    return transformProductData(response.items[0]);
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
};

/**
 * Transform Contentful product data to the format expected by the app
 * This handles cases where some fields might be missing
 * @param {Object} item - Contentful product entry
 * @returns {Object} Transformed product data
 */
const transformProductData = (item) => {
  const { fields } = item;
  
  // Basic product data that should always be present
  const product = {
    id: item.sys.id,
    slug: fields.slug || `product-${item.sys.id}`,
    title: {
      en: fields.title || '',
      zh: fields.title || '', // Fallback to English if no Chinese title
    },
    // Handle optional fields
    description: {
      en: fields.description || '',
      zh: fields.description || '', // Fallback to English if no Chinese description
    },
    image: fields.mainImage?.fields?.file?.url ? 
      `https:${fields.mainImage.fields.file.url}` : 
      '/images/products/placeholder.jpg', // Fallback image
  };
  
  // Handle Features field (JSON object)
  product.features = {
    en: [],
    zh: [],
  };
  
  if (fields.features) {
    try {
      // If features is stored as a JSON object with en/zh properties
      if (typeof fields.features === 'object' && fields.features.en) {
        product.features = fields.features;
      } else if (Array.isArray(fields.features)) {
        // If features is stored as an array
        product.features.en = fields.features;
        product.features.zh = fields.features;
      }
    } catch (error) {
      console.error('Error parsing features:', error);
    }
  }
  
  // Handle Specifications field (JSON object)
  product.specifications = {
    dimensions: '',
    weight: '',
    resolution: '',
    technology: '',
    interface: '',
  };
  
  if (fields.specifications) {
    try {
      // If specifications is stored as a JSON object
      if (typeof fields.specifications === 'object') {
        product.specifications = {
          ...product.specifications,
          ...fields.specifications,
        };
      }
    } catch (error) {
      console.error('Error parsing specifications:', error);
    }
  }
  
  // Add other optional fields as needed
  if (fields.productWarranty) {
    product.warranty = fields.productWarranty;
  }
  
  if (fields.safetyWarning) {
    product.safetyWarning = fields.safetyWarning;
  }
  
  if (fields.notesForAttention) {
    product.notes = fields.notesForAttention;
  }
  
  // Gallery images (if present)
  if (fields.galleryImages && Array.isArray(fields.galleryImages)) {
    product.gallery = fields.galleryImages.map(img => ({
      url: `https:${img.fields.file.url}`,
      alt: img.fields.title || product.title.en,
    }));
  }
  
  return product;
};