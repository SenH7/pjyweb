/**
 * Mapping between Contentful slugs and local image filenames
 * This centralized approach allows you to use your own naming convention for images
 */

// Map Contentful slugs to local image filenames
const productImageMap = {
    // Example mappings based on your current images
    '10-1-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '3-5-inch-sound-and-light-warning-spherical-camera': '/images/products/3.5camera.jpg',

    //embedded touch display
    '15-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '15-6-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '17-3-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '18-5-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '19-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '19-inch-width-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '21-5-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '23-8-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '27-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '32-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '43-inch-embedded-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',

    //open frame touch display
    '10-1-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '12-1-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '13-3-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '15-6-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '17-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '19-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '21-5-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    '23-6-inch-open-frame-capacitive-touch-display-screen': '/images/products/10.1ecapacity.jpg',
    
    //advertising machine
    '32-inch-all-in-one-touch-screen-machine': '/images/products/all-in-one.jpg',
    '43-inch-all-in-one-touch-screen-machine': '/images/products/all-in-one.jpg',
    '49-inch-all-in-one-touch-screen-machine': '/images/products/all-in-one.jpg',
    '55-inch-all-in-one-touch-screen-machine': '/images/products/all-in-one.jpg',
    '65-inch-all-in-one-touch-screen-machine': '/images/products/all-in-one.jpg',

    //non touch advertising machine
    '32-inch-advertising-all-in-one-machine': '/images/products/all-in-one.jpg',
    '43-inch-advertising-all-in-one-machine': '/images/products/all-in-one.jpg',
    '49-inch-advertising-all-in-one-machine': '/images/products/all-in-one.jpg',
    '55-inch-advertising-all-in-one-machine': '/images/products/all-in-one.jpg',
    '65-inch-advertising-all-in-one-machine': '/images/products/all-in-one.jpg',

    //outdoor advertising machine
    '55-inch-semi-outdoor-display-cabinet-unit': '/images/products/outdoor-display.png',
    '65-inch-semi-outdoor-display-cabinet-unit': '/images/products/outdoor-display.png',
    '75-inch-semi-outdoor-display-cabinet-unit': '/images/products/outdoor-display.png',

    //line screen
    '21-5-inch-single-sided-line-screen-advertising-machine': '/images/products/line-screen.png',
    '24-inch-single-sided-line-screen-advertising-machine': '/images/products/line-screen.png',
    '24-inch-double-sided-line-screen-advertising-machine': '/images/products/line-screen.png',
    '43-inch-suspended-double-sided-poster-screen': '/images/products/suspended-poster-screen.png',
    '55-inch-suspended-double-sided-poster-screen': '/images/products/suspended-poster-screen.png',

    //infrared liquid crystal all-in-one machine
    '55-inch-infrared-liquid-crystal-all-in-one-machine': '/images/products/infrared-liquid-crystal.png',
    '65-inch-infrared-liquid-crystal-all-in-one-machine': '/images/products/infrared-liquid-crystal.png',
    '75-inch-infrared-liquid-crystal-all-in-one-machine': '/images/products/infrared-liquid-crystal.png',
    '85-inch-infrared-liquid-crystal-all-in-one-machine': '/images/products/infrared-liquid-crystal.png',
    '86-inch-infrared-liquid-crystal-all-in-one-machine': '/images/products/infrared-liquid-crystal.png',
    '98-inch-infrared-liquid-crystal-all-in-one-machine': '/images/products/infrared-liquid-crystal.png',

    '55-inch-infrared-liquid-crystal-all-in-one-machine-camera-4800w': '/images/products/infrared-liquid-crystal.png',
    '65-inch-infrared-liquid-crystal-all-in-one-machine-camera-4800w': '/images/products/infrared-liquid-crystal.png',
    '75-inch-infrared-liquid-crystal-all-in-one-machine-camera-4800w': '/images/products/infrared-liquid-crystal.png',
    '85-inch-infrared-liquid-crystal-all-in-one-machine-camera-4800w': '/images/products/infrared-liquid-crystal.png',
    '86-inch-infrared-liquid-crystal-all-in-one-machine-camera-4800w': '/images/products/infrared-liquid-crystal.png',
    '98-inch-infrared-liquid-crystal-all-in-one-machine-camera-4800w': '/images/products/infrared-liquid-crystal.png',

    '55-inch-infrared-liquid-crystal-all-in-one-machine-ai-camera': '/images/products/infrared-liquid-crystal.png',
    '65-inch-infrared-liquid-crystal-all-in-one-machine-ai-camera': '/images/products/infrared-liquid-crystal.png',
    '75-inch-infrared-liquid-crystal-all-in-one-machine-ai-camera': '/images/products/infrared-liquid-crystal.png',
    '85-inch-infrared-liquid-crystal-all-in-one-machine-ai-camera': '/images/products/infrared-liquid-crystal.png',
    '86-inch-infrared-liquid-crystal-all-in-one-machine-ai-camera': '/images/products/infrared-liquid-crystal.png',
    '98-inch-infrared-liquid-crystal-all-in-one-machine-ai-camera': '/images/products/infrared-liquid-crystal.png',

    '55-inch-infrared-liquid-crystal-all-in-one-machine-camera-1300w': '/images/products/infrared-liquid-crystal.png',
    '65-inch-infrared-liquid-crystal-all-in-one-machine-camera-1300w': '/images/products/infrared-liquid-crystal.png',
    '75-inch-infrared-liquid-crystal-all-in-one-machine-camera-1300w': '/images/products/infrared-liquid-crystal.png',
    '85-inch-infrared-liquid-crystal-all-in-one-machine-camera-1300w': '/images/products/infrared-liquid-crystal.png',
    '86-inch-infrared-liquid-crystal-all-in-one-machine-camera-1300w': '/images/products/infrared-liquid-crystal.png',
    '98-inch-infrared-liquid-crystal-all-in-one-machine-camera-1300w': '/images/products/infrared-liquid-crystal.png',

    // camera
    'low-power-consumption-wifi-4g-solar-powered-camera': '/images/products/solar-camera.png',
    '1080p-high-definition-infrared-riot-control-camera': '/images/products/infrared-camera.png',
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