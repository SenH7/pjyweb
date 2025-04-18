// src/pages/products/index-optimized.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/products/ProductCard';
import Pagination from '../../components/ui/Pagination';
import SimpleCategoryFilter from '../../components/ui/SimpleCategoryFilter';
import { getProductCategories } from '../../utils/search';

export default function OptimizedProducts({ categories }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const router = useRouter();
  
  // State for products and pagination
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  // Get query parameters with defaults
  const page = parseInt(router.query.page) || 1;
  const selectedCategory = router.query.category || 'all';
  const limit = 6; // Products per page
  
  // Get the appropriate category list based on locale
  const categoryList = locale === 'en' ? categories.en : categories.zh;
  
  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      // Build API URL
      const apiUrl = `/api/simple-products?page=${page}&limit=${limit}&locale=${locale}`;
      
      // Add category if specified
      const categoryParam = selectedCategory !== 'all'
        ? `&category=${encodeURIComponent(selectedCategory)}`
        : '';
      
      // Fetch data
      const response = await fetch(`${apiUrl}${categoryParam}`);
      const { success, data } = await response.json();
      
      if (success) {
        setProducts(data.items);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
      } else {
        console.error('Failed to fetch products');
        setProducts([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch products when page, locale, or selectedCategory change
  useEffect(() => {
    // Fetch products when page, locale, or selectedCategory change
    fetchProducts();
  
    // Preserve scroll position after router change
    if (router.isReady) {
      const scrollY = window.scrollY;
      
      // Small timeout to ensure the component has fully rendered
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 0);
    }
  }, [page, locale, selectedCategory, router.query.page, router.isReady]);
  
  // Handle category selection
  const handleCategoryChange = (category) => {
    // Update URL with selected category and reset to page 1
    const query = { ...router.query };
    
    if (category === 'all') {
      delete query.category;
    } else {
      query.category = category;
    }
    
    query.page = 1; // Reset to first page
    
    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true, scroll: false }); // Prevent scrolling
  };

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
            
            {/* Simple Category Filter component */}
            <SimpleCategoryFilter
              categories={categoryList}
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>
          
          {/* Product Count & Status */}
          <div className="mb-6 text-gray-600">
            {loading ? (
              <div className="text-center">
                {locale === 'en' ? 'Loading products...' : '正在加载产品...'}
              </div>
            ) : (
              <>
                {locale === 'en' 
                  ? `Showing ${products.length} of ${totalItems} products`
                  : `显示 ${totalItems} 个产品中的 ${products.length} 个`}
              </>
            )}
          </div>
          
          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
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
          
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination 
              totalItems={totalItems} 
              itemsPerPage={limit} 
              currentPage={page} 
            />
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

export async function getServerSideProps({ locale }) {
  try {
    // Fetch product categories
    const categories = await getProductCategories();
    
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        categories,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        categories: { en: [], zh: [] },
      },
    };
  }
}