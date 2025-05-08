// src/pages/products/[slug].js - Update for categories display
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { getAllProducts, getProductBySlug } from '../../utils/search';
import ProductCard from '../../components/products/ProductCard';
import React from 'react';

export default function ProductDetail({ product, relatedProducts }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  // Helper to translate categories
  const getCategoryLabel = (category) => {
    // Define category translations
    const categoryTranslations = {
      // English to Chinese
      "Embedded touch display": "嵌入式触摸屏",
      "Open-frame touch display": "开放式触摸屏",
      "Industry / Commerce": "工业/商业",
      "Advertising machine": "广告机",
      "Conference educational equipment": "会议教育设备",
      "Terminal communication equipment": "终端通讯设备",
      "Security surveillance camera": "安防摄像机",
      "Television": "电视",
      
      // Chinese to English
      "嵌入式触摸屏": "Embedded touch display",
      "开放式触摸屏": "Open-frame touch display",
      "工业/商业": "Industry / Commerce",
      "广告机": "Advertising machine",
      "会议教育设备": "Conference educational equipment",
      "终端通讯设备": "Terminal communication equipment",
      "安防摄像机": "Security surveillance camera",
      "电视": "Television"
    };
    
    // For Chinese locale, try to get the Chinese translation
    if (locale === 'zh' && categoryTranslations[category]) {
      return categoryTranslations[category];
    }
    
    // For English locale or if translation not found
    return category;
  };

  const ProductSpecifications = ({ product, locale }) => {
    // Skip rendering if no specifications
    if (!product.specifications || Object.keys(product.specifications).length === 0) {
      return null;
    }
  
    // Map of specification keys to their translations
    const translations = {
      // Common specifications
      size: { en: 'Size', zh: '尺寸' },
      weight: { en: 'Weight', zh: '重量' },
      brightness: { en: 'Brightness', zh: '亮度' },
      dimensions: { en: 'Dimensions', zh: '机身尺寸' },
      resolution: { en: 'Resolution', zh: '分辨率' },
      color: { en: 'Color', zh: '颜色' },
      
      // Touch screen specifications
      backlight: { en: 'Backlight', zh: '背光' },
      technology: { en: 'Technology', zh: '技术' },
      displayRatio: { en: 'Display Ratio', zh: '显示比例' },
      contrastRatio: { en: 'Contrast Ratio', zh: '对比度' },
      compatibleOS: { en: 'Compatible OS', zh: '兼容操作系统' },
      inputInterfaces: { en: 'Input Interfaces', zh: '接口' },
      
      // All-in-one specifications
      
      // Camera specifications
      model: { en: 'Model', zh: '型号' },
      lens: { en: 'Lens', zh: '镜头' },
      audio: { en: 'Audio', zh: '音频' },
      storage: { en: 'Storage', zh: '存储' },
      powerSupply: { en: 'Power Supply', zh: '电源' },
      powerConsumption: { en: 'Power Consumption', zh: '功耗' },
    };
  
    // Get specifications with non-empty values
    const validSpecs = Object.entries(product.specifications)
      .filter(([_, value]) => value && String(value).trim() !== '');
  
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {locale === 'en' ? 'Technical Specifications' : '技术规格'}
        </h2>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            {validSpecs.map(([key, value]) => {
              // Convert keys with spaces to camelCase for normalization when looking up translations
              const normalizedKey = key.replace(/\s+/g, '').toLowerCase();
              
              // Try to find translation by exact key first, then by normalized key
              let translatedLabel;
              if (translations[key]) {
                translatedLabel = translations[key][locale] || translations[key].en;
              } else {
                // Try to find a match by normalizing the keys
                const matchingKey = Object.keys(translations).find(transKey => 
                  transKey.replace(/\s+/g, '').toLowerCase() === normalizedKey
                );
                
                if (matchingKey) {
                  translatedLabel = translations[matchingKey][locale] || translations[matchingKey].en;
                } else {
                  // Fallback: Format the key to be more readable
                  translatedLabel = key
                    // Add spaces before capital letters
                    .replace(/([A-Z])/g, ' $1')
                    // Capitalize first letter
                    .replace(/^./, str => str.toUpperCase());
                }
              }
              
              return (
                <React.Fragment key={key}>
                  <div className="text-gray-600">
                    {translatedLabel}:
                  </div>
                  <div className="font-medium">{value}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {locale === 'en' ? 'Product Not Found' : '产品未找到'}
          </h1>
          <p className="mb-8">
            {locale === 'en'
              ? 'The product you are looking for does not exist or has been removed.'
              : '您寻找的产品不存在或已被移除。'}
          </p>
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-block transition-colors"
          >
            {locale === 'en' ? 'View All Products' : '查看所有产品'}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${product.title[locale] || product.title.en} | PJY Touchscreen`}
    >
      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {locale === 'en' ? 'Home' : '首页'}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              {locale === 'en' ? 'Products' : '产品'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{product.title[locale] || product.title.en}</span>
          </div>
        </div>
      </div>

      {/* Product Hero */}
      <section className="pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image || '/images/products/placeholder.jpg'}
                  alt={product.title[locale] || product.title.en}
                  className="w-full h-auto"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't load
                    e.target.src = '/images/products/placeholder-product.jpg';
                  }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{product.title[locale] || product.title.en}</h1>
              
              {/* Display product categories */}
              {product.categories && product.categories.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">
                    {locale === 'en' ? 'Categories' : '类别'}:
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((category, index) => (
                      <Link 
                        key={index}
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      >
                        {getCategoryLabel(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* specifications section  */}
              {product.specifications && <ProductSpecifications product={product} locale={locale} />}

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  {locale === 'en' ? 'Request a Quote' : '请求报价'}
                </Link>
                {/* Only show datasheet link if it exists */}
                {product.datasheet && (
                  <a
                    href={product.datasheet}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                    {locale === 'en' ? 'Download Datasheet' : '下载数据表'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              {locale === 'en' ? 'Related Products' : '相关产品'}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, locale }) {
  // Fetch the specific product
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      notFound: true, // This will render 404 page
    };
  }

  // Fetch all products to get related products
  // Try to find related products in the same category first
  const allProducts = await getAllProducts();
  let relatedProducts = [];

  // If the product has categories, try to find products in the same category
  if (product.categories && product.categories.length > 0) {
    const mainCategory = product.categories[0];
    // Filter products with the same category, excluding the current product
    relatedProducts = allProducts.filter(p => 
      p.id !== product.id && 
      p.categories && 
      p.categories.includes(mainCategory)
    ).slice(0, 3);  // Get up to 3 related products
  }

  // If no related products found by category or not enough, add some random products
  if (relatedProducts.length < 3) {
    const randomProducts = allProducts
      .filter(p => p.id !== product.id && !relatedProducts.some(rp => rp.id === p.id))
      .slice(0, 3 - relatedProducts.length);
    
    relatedProducts = [...relatedProducts, ...randomProducts];
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      product,
      relatedProducts,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  try {
    const products = await getAllProducts();

    // Create paths for all products in all locales
    const paths = [];

    ['en', 'zh'].forEach(locale => {
      products.forEach(product => {
        // Skip products with invalid slugs
        if (!product.slug) {
          console.warn(`Product ${product.id} has no slug, skipping in static paths`);
          return;
        }

        // Make sure slug is a string
        let slug;
        if (typeof product.slug === 'object') {
          // If it's an object, try to get the value based on locale or default to en-US
          slug = product.slug[locale] || product.slug['en-US'] || product.slug['en'] || `product-${product.id}`;
        } else {
          slug = product.slug;
        }

        // Convert to string and ensure it's URL-safe
        slug = String(slug).trim();

        paths.push({
          params: { slug },
          locale,
        });
      });
    });

    return {
      paths,
      fallback: 'blocking', // 'blocking' allows for fallback to SSR for new products
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}