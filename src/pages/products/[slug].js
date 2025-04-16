// src/pages/products/[slug].js
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

  const ProductSpecifications = ({ product, locale }) => {
    // Skip rendering if no specifications
    if (!product.specifications || Object.keys(product.specifications).length === 0) {
      return null;
    }
  
    // Map of specification keys to their translations
    const translations = {
      // Common specifications
      dimensions: { en: 'Dimensions', zh: '尺寸规格' },
      weight: { en: 'Weight', zh: '重量' },
      resolution: { en: 'Resolution', zh: '分辨率' },
      color: { en: 'Color', zh: '色彩' },
      
      // Touch screen specifications
      size: { en: 'Size', zh: '尺寸' },
      backlight: { en: 'Backlight', zh: '背光' },
      brightness: { en: 'Brightness', zh: '亮度' },
      technology: { en: 'Technology', zh: '技术' },
      aspectRatio: { en: 'Aspect Ratio', zh: '宽高比' },
      contrastRatio: { en: 'Contrast Ratio', zh: '对比度' },
      videoInputs: { en: 'Video Inputs', zh: '视频输入' },
      compatibleOS: { en: 'Compatible OS', zh: '兼容操作系统' },
      otherInterfaces: { en: 'Other Interfaces', zh: '其他接口' },
      
      // All-in-one specifications
      maximumViewingAngle: { en: 'Maximum Viewing Angle', zh: '最大视角' },
      effectiveDisplayArea: { en: 'Effective Display Area', zh: '有效显示区域' },
      wallMountBracketSize: { en: 'Wall Mount Bracket Size', zh: '壁挂支架尺寸' },
      
      // Camera specifications
      audio: { en: 'Audio', zh: '音频' },
      lenses: { en: 'Lenses', zh: '镜头' },
      chipset: { en: 'Chipset', zh: '芯片组' },
      storage: { en: 'Storage', zh: '存储' },
      wifiRange: { en: 'WiFi Range', zh: 'WiFi范围' },
      compression: { en: 'Compression', zh: '压缩' },
      nightVision: { en: 'Night Vision', zh: '夜视' },
      powerSupply: { en: 'Power Supply', zh: '电源' },
      wifiStandard: { en: 'WiFi Standard', zh: 'WiFi标准' },
      networkInterface: { en: 'Network Interface', zh: '网络接口' },
      powerConsumption: { en: 'Power Consumption', zh: '功耗' },
      operatingTemperature: { en: 'Operating Temperature', zh: '工作温度' }
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
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3);

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

    // Debug
    console.log('Products for static paths:',
      products.map(p => ({ id: p.id, slug: p.slug, type: typeof p.slug }))
    );

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

        console.log(`Adding path for product ${product.id} with slug "${slug}" for locale ${locale}`);

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