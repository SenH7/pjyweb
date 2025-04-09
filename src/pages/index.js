// src/pages/index.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import ProductCard from '../components/products/ProductCard';
import ImageCarousel from '../components/ui/ImageCarousel';
import { getAllProducts } from '../utils/search';

export default function Home() {
  // export default function Home({ featuredProducts }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  // Get featured products (for this example, just the first 3)
  // const featuredProducts = getAllProducts().slice(0, 3);

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getAllProducts();
        setFeaturedProducts(products.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured products:', error);
        setFeaturedProducts([]);
      }
    };

    loadProducts();
  }, []);

  const carouselImages = [
    {
      src: "/images/hero-touchscreen.jpg",
      alt: "High-quality touchscreen display"
    },
    {
      src: "/images/hero-touchscreen-2.jpg",
      alt: "Industrial touchscreen solution"
    },
    {
      src: "/images/hero-touchscreen-3.jpg",
      alt: "Multi-touch capacitive display"
    },
    {
      src: "/images/hero-touchscreen-4.jpg",
      alt: "Multi-touch capacitive display"
    },
    {
      src: "/images/hero-touchscreen-5.jpg",
      alt: "Multi-touch capacitive display"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {locale === 'en'
                  ? 'High-Quality Touchscreen Solutions'
                  : '高品质触摸屏解决方案'}
              </h1>
              <p className="text-xl mb-6">
                {locale === 'en'
                  ? 'Innovative touchscreen technology for various industries and applications.'
                  : '为各行业和应用提供创新触摸屏技术。'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {locale === 'en' ? 'View Products' : '查看产品'}
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {locale === 'en' ? 'Contact Us' : '联系我们'}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              {/* <img 
                src="/images/hero-touchscreen.jpg" 
                alt="Touchscreen Display" 
                className="rounded-lg shadow-lg"
              /> */}
              <div className="rounded-lg shadow-lg overflow-hidden">
                <ImageCarousel images={carouselImages} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {locale === 'en' ? 'Why Choose Our Touchscreens?' : '为什么选择我们的触摸屏？'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'en' ? 'High Performance' : '高性能'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'Our touchscreens provide responsive and accurate touch detection with minimal latency.'
                  : '我们的触摸屏提供响应迅速、准确的触摸检测，延迟极低。'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'en' ? 'Durability' : '耐用性'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'Designed to withstand heavy use in various environments, from retail to industrial applications.'
                  : '设计能够承受各种环境中的大量使用，从零售到工业应用。'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'en' ? 'Customization' : '定制化'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'We offer customizable solutions to meet specific requirements for size, sensitivity, and interface.'
                  : '我们提供可定制的解决方案，以满足尺寸、灵敏度和接口的特定要求。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {locale === 'en' ? 'Featured Products' : '精选产品'}
            </h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              {locale === 'en' ? 'View All Products' : '查看所有产品'}
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'en'
              ? 'Ready to Upgrade Your Technology?'
              : '准备升级您的技术？'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Contact our team today to discuss your touchscreen needs and get a customized solution.'
              : '立即联系我们的团队，讨论您的触摸屏需求并获取定制解决方案。'}
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-block"
          >
            {locale === 'en' ? 'Get in Touch' : '联系我们'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

// export async function getStaticProps({ locale }) {
//   // Fetch products from Contentful
//   let featuredProducts = [];
//   try {
//     const products = await getAllProducts();
//     featuredProducts = products.slice(0, 3);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//   }

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//       featuredProducts,
//     },
//     revalidate: 3600, // Revalidate every hour
//   };
// }