import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout/Layout';
import ProductCard from '../../components/products/ProductCard';
import { getAllProducts } from '../../utils/search';

export default function Products({ products }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <Layout
      title={locale === 'en' ? 'Products | PJY Touchscreen' : '产品 | PJY触摸屏'}
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
          {/* Product Categories (optional) */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'en' ? 'All Products' : '所有产品'}
            </h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                {locale === 'en' ? 'All' : '全部'}
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors">
                {locale === 'en' ? 'Capacitive' : '电容式'}
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors">
                {locale === 'en' ? 'Resistive' : '电阻式'}
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors">
                {locale === 'en' ? 'Industrial' : '工业用'}
              </button>
            </div>
          </div>
          
          {/* Products */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
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
  // Fetch products from Contentful
  let products = [];
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products,
    },
    // Revalidate every hour (3600 seconds)
    revalidate: 3600,
  };
}