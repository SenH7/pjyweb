// src/utils/contentful.js
import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

/**
 * Get all products from Contentful with proper multilingual support
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
 * Get a single product by slug with proper multilingual support
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
 * This improved version properly handles multilingual content
 * @param {Object} item - Contentful product entry
 * @returns {Object} Transformed product data
 */
const transformProductData = (item) => {
  const { fields, sys } = item;
  
  // Debug logging
  console.log("Raw fields from Contentful:", fields);
  console.log("Title field type:", typeof fields.title);
  if (typeof fields.title === 'object') {
    console.log("Title languages available:", Object.keys(fields.title));
    console.log("English title:", fields.title['en-US']);
    console.log("Chinese title:", fields.title['zh'] || fields.title['zh-CN']);
  }

  // Basic product data
  const product = {
    id: sys.id,
    slug: fields.slug || `product-${sys.id}`,
    title: {
      en: typeof fields.title === 'object' ? fields.title['en-US'] || '' : fields.title || '',
      zh: typeof fields.title === 'object' ? fields.title['zh'] || fields.title['zh-CN'] || '' : '',
    },
    description: {
      en: typeof fields.description === 'object' ? fields.description['en-US'] || '' : fields.description || '',
      zh: typeof fields.description === 'object' ? fields.description['zh'] || fields.description['zh-CN'] || '' : '',
    },
    image: fields.mainImage?.fields?.file?.url ? 
      `https:${fields.mainImage.fields.file.url}` : 
      '/images/products/placeholder.jpg', // Fallback image
  };
  
  // Handle Features field (as JSON object or localized)
  product.features = {
    en: [],
    zh: [],
  };
  
  if (fields.features) {
    try {
      if (typeof fields.features === 'object') {
        if (fields.features['en-US']) {
          // It's a localized field
          product.features.en = fields.features['en-US'] || [];
          product.features.zh = fields.features['zh'] || fields.features['zh-CN'] || [];
        } else if (fields.features.en) {
          // It's a JSON object with language keys
          product.features = fields.features;
        } else if (Array.isArray(fields.features)) {
          // It's just an array
          product.features.en = fields.features;
        }
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
    // other specification fields...
  };
  
  if (fields.specifications) {
    try {
      if (typeof fields.specifications === 'object') {
        if (fields.specifications['en-US']) {
          // It's a localized field
          product.specifications = {
            ...product.specifications,
            ...fields.specifications['en-US']
          };
          
          // Store Chinese specifications if needed
          if (fields.specifications['zh'] || fields.specifications['zh-CN']) {
            product.specificationsZh = fields.specifications['zh'] || fields.specifications['zh-CN'];
          }
        } else {
          // Regular JSON object
          product.specifications = {
            ...product.specifications,
            ...fields.specifications,
          };
        }
      }
    } catch (error) {
      console.error('Error parsing specifications:', error);
    }
  }
  
  // Add other optional fields as needed
  if (fields.productWarranty) {
    if (typeof fields.productWarranty === 'object') {
      product.warranty = fields.productWarranty['en-US'] || '';
      product.warrantyZh = fields.productWarranty['zh'] || fields.productWarranty['zh-CN'] || '';
    } else {
      product.warranty = fields.productWarranty;
    }
  }
  
  if (fields.safetyWarning) {
    if (typeof fields.safetyWarning === 'object') {
      product.safetyWarning = fields.safetyWarning['en-US'] || '';
      product.safetyWarningZh = fields.safetyWarning['zh'] || fields.safetyWarning['zh-CN'] || '';
    } else {
      product.safetyWarning = fields.safetyWarning;
    }
  }
  
  if (fields.notesForAttention) {
    if (typeof fields.notesForAttention === 'object') {
      product.notes = fields.notesForAttention['en-US'] || '';
      product.notesZh = fields.notesForAttention['zh'] || fields.notesForAttention['zh-CN'] || '';
    } else {
      product.notes = fields.notesForAttention;
    }
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

// export default {
//   getContentfulProducts,
//   getContentfulProductBySlug
// };

export const testLocalizedFields = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'product',
      limit: 1,
    });
    
    if (response.items.length > 0) {
      const item = response.items[0];
      console.log("Raw fields:", item.fields);
      
      const transformed = transformProductData(item);
      console.log("Transformed product:", transformed);
      
      return {
        raw: item.fields,
        transformed: transformed
      };
    }
    
    return null;
  } catch (error) {
    console.error("Test error:", error);
    return null;
  }
};

// Update the default export
export default {
  getContentfulProducts,
  getContentfulProductBySlug,
  testLocalizedFields
};