// src/utils/search.js
import Fuse from 'fuse.js';

// This would typically be loaded from a data source or API
// For this example, we'll use a mock product data array
const products = [
  {
    id: 1,
    slug: 'capacitive-touchscreen-10.1inch',
    title: {
      en: '10.1-inch Capacitive Touchscreen',
      zh: '10.1英寸电容式触摸屏'
    },
    description: {
      en: 'High-performance 10.1-inch capacitive touchscreen with multi-touch support and excellent durability.',
      zh: '高性能10.1英寸电容式触摸屏，支持多点触控和出色的耐用性。'
    },
    features: {
      en: [
        'Multi-touch support',
        '1920x1080 resolution',
        'Scratch-resistant surface',
        'Low power consumption',
        'Wide viewing angle'
      ],
      zh: [
        '多点触控支持',
        '1920x1080分辨率',
        '防刮表面',
        '低功耗',
        '宽视角'
      ]
    },
    specifications: {
      dimensions: '229mm x 149mm x 7.5mm',
      weight: '350g',
      resolution: '1920x1080',
      technology: 'PCAP',
      interface: 'USB/I2C'
    },
    image: '/images/products/10.1ecapacity.jpg'
  },
  {
    id: 2,
    slug: 'resistive-touchscreen-7inch',
    title: {
      en: '7-inch Resistive Touchscreen',
      zh: '7英寸电阻式触摸屏'
    },
    description: {
      en: 'Durable 7-inch resistive touchscreen ideal for industrial applications and environments with gloved operation.',
      zh: '耐用的7英寸电阻式触摸屏，非常适合工业应用和需要戴手套操作的环境。'
    },
    features: {
      en: [
        'Glove-compatible operation',
        '800x480 resolution',
        'High durability',
        'Pressure-sensitive input',
        'Wide temperature range'
      ],
      zh: [
        '兼容手套操作',
        '800x480分辨率',
        '高耐用性',
        '压力敏感输入',
        '宽温度范围'
      ]
    },
    specifications: {
      dimensions: '165mm x 104mm x 5.8mm',
      weight: '180g',
      resolution: '800x480',
      technology: '4-wire Resistive',
      interface: 'USB'
    },
    image: '/images/products/7eresistance.jpg'
  },
  {
    id: 3,
    slug: 'industrial-touchscreen-15inch',
    title: {
      en: '15-inch Industrial Touchscreen',
      zh: '15英寸工业触摸屏'
    },
    description: {
      en: 'Rugged 15-inch touchscreen designed for industrial environments with extreme temperature resistance and waterproof capability.',
      zh: '坚固的15英寸触摸屏，专为工业环境设计，具有极端温度抵抗力和防水功能。'
    },
    features: {
      en: [
        'IP65 rated waterproof',
        '1024x768 resolution',
        'Extreme temperature resistance (-20°C to 70°C)',
        'Anti-glare coating',
        'Vibration resistant'
      ],
      zh: [
        'IP65级防水',
        '1024x768分辨率',
        '极端温度抵抗（-20°C至70°C）',
        '防眩光涂层',
        '抗振动'
      ]
    },
    specifications: {
      dimensions: '356mm x 288mm x 12mm',
      weight: '980g',
      resolution: '1024x768',
      technology: 'PCAP with glove mode',
      interface: 'USB/RS232'
    },
    image: '/images/products/15industry.jpg'
  }
];

/**
 * Search products based on a query
 * @param {string} query - Search query
 * @param {string} locale - Current locale (en or zh)
 * @returns {Array} Search results
 */
export const searchProducts = (query, locale = 'en') => {
  if (!query) return [];
  
  const options = {
    includeScore: true,
    threshold: 0.4,
    keys: [
      `title.${locale}`,
      `description.${locale}`,
      `features.${locale}`
    ]
  };
  
  const fuse = new Fuse(products, options);
  const results = fuse.search(query);
  
  return results.map(result => result.item);
};

/**
 * Get all products
 * @returns {Array} All products
 */
export const getAllProducts = () => {
  return products;
};

/**
 * Get a single product by slug
 * @param {string} slug - Product slug
 * @returns {Object|null} Product or null if not found
 */
export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug) || null;
};