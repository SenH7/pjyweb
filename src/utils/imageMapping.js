/**
 * Mapping between Contentful slugs and local image filenames
 * This centralized approach allows you to use your own naming convention for images
 */

// Map Contentful slugs to local image filenames
const productImageMap = {
    // Example mappings based on your current images
    '10-1-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '3-5-inch-sound-and-light-warning-spherical-camera': '/images/products/3.5camera.jpg',
    'all-in-one-touch-screen-machine': '/images/products/all-in-one.jpg',

    // Add more mappings as needed
    // 'product-slug-from-contentful': '/images/products/your-image-filename.jpg',
};

// Map for gallery images (you can customize this if needed)
const galleryImageMap = {
    // You can define specific gallery images if needed
    // 'product-slug-from-contentful': ['/images/products/gallery1.jpg', '/images/products/gallery2.jpg'],
};

/**
 * Get the local image filename for a product
 * @param {string} slug - The Contentful product slug
 * @returns {string} - The local image path
 */
export const getProductImage = (slug) => {
    if (!slug) return '/images/products/placeholder-product.jpg';

    // Check if there's a specific mapping for this slug
    const imagePath = productImageMap[slug];

    if (imagePath) {
        return imagePath;
    }

    // If no mapping exists, use a default naming pattern based on slug
    // This helps with automatic image matching
    return `/images/products/${slug}.jpg`;
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
            url: image,
            alt: `${title || 'Product'} view ${index + 1}`
        }));
    }

    // If no specific mapping, generate fallback gallery from main image
    const mainImage = getProductImage(slug);
    if (mainImage && mainImage !== '/images/products/placeholder-product.jpg') {
        return [
            {
                url: mainImage,
                alt: `${title || 'Product'} main view`
            }
        ];
    }

    return [];
};

export default {
    getProductImage,
    getProductGallery,
    productImageMap
};