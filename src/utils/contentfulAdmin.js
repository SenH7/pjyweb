// src/utils/contentfulAdmin.js
// This is a utility file to handle Contentful data in the admin interface

/**
 * Get a single product by ID
 * @param {string} id - Product ID or slug
 * @returns {Promise<Object|null>} Product or null if not found
 */
export const getProduct = async (id) => {
    try {
      // First try to get from API by slug
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Product not found:', id);
        return null;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };
  
  /**
   * Update a product in Contentful
   * In a real app, this would call the Contentful Management API
   * For this demo, it's just a simulation
   * 
   * @param {Object} productData - Updated product data
   * @returns {Promise<boolean>} Success status
   */
  export const updateProduct = async (productData) => {
    try {
      // Simulate API call
      console.log('Updating product in Contentful:', productData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would make an API call to update the product
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  };
  
  /**
   * Validate product data for both languages
   * @param {Object} productData - Product data to validate
   * @returns {Object} Validation result { isValid, errors }
   */
  export const validateProductData = (productData) => {
    const errors = [];
    
    // Check required fields
    if (!productData.title.en) {
      errors.push('English title is required');
    }
    
    if (!productData.title.zh) {
      errors.push('Chinese title is required');
    }
    
    // Check if Chinese title is just a copy of English
    if (productData.title.zh === productData.title.en && productData.title.en) {
      errors.push('Chinese title should be different from English title');
    }
    
    // Check description
    if (!productData.description.en) {
      errors.push('English description is required');
    }
    
    if (!productData.description.zh) {
      errors.push('Chinese description is required');
    }
    
    // Check for copied content
    if (productData.description.zh === productData.description.en && productData.description.en && productData.description.en.length > 10) {
      errors.push('Chinese description appears to be a copy of English description');
    }
    
    // Additional validations can be added here
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  /**
   * Check if a product has complete multilingual content
   * @param {Object} product - Product to check
   * @returns {Object} Status { complete, missingFields }
   */
  export const checkMultilingualStatus = (product) => {
    const missingFields = [];
    
    // Check title
    if (!product.title?.en || product.title.en === '') {
      missingFields.push('English title');
    }
    
    if (!product.title?.zh || product.title.zh === '') {
      missingFields.push('Chinese title');
    }
    
    // Check description
    if (!product.description?.en || product.description.en === '') {
      missingFields.push('English description');
    }
    
    if (!product.description?.zh || product.description.zh === '') {
      missingFields.push('Chinese description');
    }
    
    // Check features
    if (!product.features?.en || product.features.en.length === 0) {
      missingFields.push('English features');
    }
    
    if (!product.features?.zh || product.features.zh.length === 0) {
      missingFields.push('Chinese features');
    }
    
    return {
      complete: missingFields.length === 0,
      missingFields
    };
  };
  
  /**
   * Prepare product data for Contentful submission
   * This transforms our app's data structure back to Contentful's expected format
   * @param {Object} productData - Product data from the app
   * @returns {Object} Data formatted for Contentful
   */
  export const prepareForContentful = (productData) => {
    const contentfulData = {
      fields: {
        title: {
          'en-US': productData.title.en
        },
        titleChinese: {
          'en-US': productData.title.zh
        },
        slug: {
          'en-US': productData.slug
        },
        description: {
          'en-US': productData.description.en
        },
        descriptionChinese: {
          'en-US': productData.description.zh
        },
        features: {
          'en-US': productData.features.en
        },
        featuresChinese: {
          'en-US': productData.features.zh
        },
        specifications: {
          'en-US': productData.specifications
        },
        // Include other fields as needed
      }
    };
    
    return contentfulData;
  };
  
  export default {
    getProduct,
    updateProduct,
    validateProductData,
    checkMultilingualStatus,
    prepareForContentful
  };