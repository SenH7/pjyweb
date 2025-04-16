/**
 * Mapping between Contentful slugs and local image filenames
 * This centralized approach allows you to use your own naming convention for images
 */

// Map Contentful slugs to local image filenames
const productImageMap = {
    // Example mappings based on your current images
    'resistive-touchscreen-7inch': '7eresistance.jpg',
    'capacitive-touchscreen-10.1inch': '10.1ecapacity.jpg',
    'industrial-touchscreen-15inch': '15industry.jpg',

    // Add more mappings as needed
    // 'product-slug-from-contentful': 'your-image-filename.jpg',
};

// Map for gallery images (you can customize this if needed)
const galleryImageMap = {
    // You can define specific gallery images if needed
    // 'product-slug-from-contentful': ['gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg'],
};

/**
 * Get the local image filename for a product
 * @param {string} slug - The Contentful product slug
 * @returns {string} - The local image path
 */
export const getProductImage = (slug) => {
    if (!slug) return '/images/products/placeholder-product.jpg';

    // Check if there's a specific mapping for this slug
    const imageName = productImageMap[slug];

    if (imageName) {
        return `/images/products/${imageName}`;
    }

    // If no mapping exists, use a default naming pattern or placeholder
    return '/images/products/placeholder-product.jpg';
};

/**
 * Get gallery images for a product
 * @param {string} slug - The Contentful product slug
 * @returns {Array} - Array of gallery image objects with url and alt
 */
export const getProductGallery = (slug, title = '') => {
    if (!slug) return [];

    // Check if there's a specific gallery mapping for this slug
    const galleryImages = galleryImageMap[slug];

    if (galleryImages && Array.isArray(galleryImages)) {
        return galleryImages.map((image, index) => ({
            url: `/images/products/${image}`,
            alt: `${title || 'Product'} view ${index + 1}`
        }));
    }

    // If no specific mapping, we could try to use the main image 
    // or return an empty array
    return [];
};

export default {
    getProductImage,
    getProductGallery,
    productImageMap
};