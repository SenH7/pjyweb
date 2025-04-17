import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/products/ProductCard';
import { getAllProducts, filterProductsByCategory, getProductCategories } from '../../utils/search';

export default function Products({ products, categories }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Update filtered products when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = filterProductsByCategory(products, selectedCategory, locale);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products, locale]);

  // Get the appropriate category list based on locale
  const categoryList = locale === 'en' ? categories.en : categories.zh;

  return (
    <Layout
      title={locale === 'en' ? 'Products' : '产品'}
      description={locale === 'en' 
        ? 'Explore our range of high-quality touchscreen products for various applications.' 
        : '探索我们各种应用的高品质触摸屏产品系列。'}
    >
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {locale === 'en' ? 'Our Products' : '我们的产品'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-600">
            {locale === 'en'
              ? 'Explore our range of innovative touchscreen solutions designed for various applications.'
              : '探索我们为各种应用设计的创新触摸屏解决方案系列。'}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Product Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'en' ? 'All Products' : '所有产品'}
            </h2>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {locale === 'en' ? 'All' : '全部'}
              </button>
              
              {/* Dynamic category buttons based on available categories */}
              {categoryList.map((category) => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {locale === 'en' 
                ? 'No products found in this category.' 
                : '在此类别中找不到产品。'}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'en' 
              ? 'Need a Custom Solution?' 
              : '需要定制解决方案？'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            {locale === 'en'
              ? "Don't see exactly what you're looking for? We offer customized touchscreen solutions tailored to your specific requirements."
              : "没有找到您需要的产品？我们提供根据您的具体要求定制的触摸屏解决方案。"}
          </p>
          <a 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium inline-block transition-colors"
          >
            {locale === 'en' ? 'Contact for Custom Solutions' : '联系我们获取定制解决方案'}
          </a>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  try {
    // Fetch products from Contentful
    const products = await getAllProducts();
    
    // Fetch product categories
    const categories = await getProductCategories();
    
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        products,
        categories,
      },
      // Revalidate every hour (3600 seconds)
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        products: [],
        categories: { en: [], zh: [] },
      },
      revalidate: 3600,
    };
  }
}