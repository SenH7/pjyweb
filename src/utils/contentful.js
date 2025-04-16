// src/utils/contentful.js
import { createClient } from 'contentful';
import { getProductImage, getProductGallery } from './imageMapping';

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
    const response = await client.withAllLocales.getEntries({
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
    const response = await client.withAllLocales.getEntries({
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
 * Using local images instead of Contentful-hosted images
 * @param {Object} item - Contentful product entry
 * @returns {Object} Transformed product data
 */
const transformProductData = (item) => {
  const { fields, sys } = item;

  // Extract product slug
  const productSlug = fields.slug?.['en-US'] || `product-${sys.id}`;
  
  // Basic product data
  const product = {
    id: sys.id,
    slug: productSlug,
    title: {
      en: fields.title?.['en-US'] || '',
      zh: fields.titleChinese?.['en-US'] || fields.title?.['zh-CN'] || fields.title?.['zh'] || '',
    },
    // Use the mapping function to get the correct image path
    // This function is defined in utils/imageMapping.js
    image: getProductImage(productSlug),
  };
  
  // Handle Specifications field (JSON object)
  product.specifications = {
    // Default values for common specifications
    weight: '',
    resolution: '',
    dimensions: '',
    brightness: '',
    contrastRatio: '',
    aspectRatio: '',
    // Default values for touch specifications
    size: '',
    backlight: '',
    technology: '',
    videoInputs: '',
    compatibleOS: '',
    otherInterfaces: '',
    
    // Default values for camera specifications
    audio: '',
    lenses: '',
    chipset: '',
    storage: '',
    wifiRange: '',
    compression: '',
    nightVision: '',
    powerSupply: '',
    wifiStandard: '',
    networkInterface: '',
    powerConsumption: '',
    operatingTemperature: '',
    // Default values for all in one machine specifications

    maximumViewingAngle: '',
    effectiveDisplayArea: '',
    wallMountBracketSize: '',
    resolution: '',
    // other specification fields...
  };
  
  if (fields.specifications) {
    try {
      if (typeof fields.specifications['en-US'] !== 'undefined') {
        // It's a localized field with specifications as an object
        product.specifications = {
          ...product.specifications,
          ...fields.specifications['en-US']
        };
      } else if (typeof fields.specifications === 'object') {
        // Direct specifications object
        product.specifications = {
          ...product.specifications,
          ...fields.specifications
        };
      }
    } catch (error) {
      console.error('Error parsing specifications:', error);
    }
  }
  
  // Use the mapping function to get gallery images if any
  product.gallery = getProductGallery(productSlug, product.title.en);
  
  return product;
};

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