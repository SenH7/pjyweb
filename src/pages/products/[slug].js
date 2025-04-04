import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { getAllProducts, getProductBySlug } from '../../utils/search';
import ProductCard from '../../components/products/ProductCard';

export default function ProductDetail({ product }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  
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
      title={`${product.title[locale]} | PJY Touchscreen`}
      description={product.description[locale]}
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
            <span className="text-gray-800 font-medium">{product.title[locale]}</span>
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
                  src={product.image} 
                  alt={product.title[locale]} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{product.title[locale]}</h1>
              <p className="text-lg text-gray-700 mb-6">{product.description[locale]}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">
                  {locale === 'en' ? 'Key Features' : '主要特点'}
                </h2>
                <ul className="space-y-2">
                  {product.features[locale].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">
                  {locale === 'en' ? 'Technical Specifications' : '技术规格'}
                </h2>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-gray-600">
                      {locale === 'en' ? 'Dimensions' : '尺寸'}:
                    </div>
                    <div className="font-medium">{product.specifications.dimensions}</div>
                    
                    <div className="text-gray-600">
                      {locale === 'en' ? 'Weight' : '重量'}:
                    </div>
                    <div className="font-medium">{product.specifications.weight}</div>
                    
                    <div className="text-gray-600">
                      {locale === 'en' ? 'Resolution' : '分辨率'}:
                    </div>
                    <div className="font-medium">{product.specifications.resolution}</div>
                    
                    <div className="text-gray-600">
                      {locale === 'en' ? 'Technology' : '技术'}:
                    </div>
                    <div className="font-medium">{product.specifications.technology}</div>
                    
                    <div className="text-gray-600">
                      {locale === 'en' ? 'Interface' : '接口'}:
                    </div>
                    <div className="font-medium">{product.specifications.interface}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  {locale === 'en' ? 'Request a Quote' : '请求报价'}
                </Link>
                <a 
                  href={`/products/${product.slug}-datasheet.pdf`} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  {locale === 'en' ? 'Download Datasheet' : '下载数据表'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Information Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 border-b border-gray-300">
            <div className="flex flex-wrap -mb-px">
              <button className="mr-4 py-2 px-4 border-b-2 border-blue-600 font-medium text-blue-600">
                {locale === 'en' ? 'Description' : '描述'}
              </button>
              <button className="mr-4 py-2 px-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 font-medium">
                {locale === 'en' ? 'Applications' : '应用'}
              </button>
              <button className="mr-4 py-2 px-4 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300 font-medium">
                {locale === 'en' ? 'FAQ' : '常见问题'}
              </button>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              {locale === 'en'
                ? `The ${product.title.en} is designed for ${product.specifications.technology === 'PCAP' ? 'modern' : 'industrial'} applications requiring ${product.specifications.technology === 'PCAP' ? 'multi-touch capability and excellent visual clarity' : 'durability and reliable operation in harsh environments'}. With its ${product.specifications.resolution} resolution and responsive interface, it provides an exceptional user experience.`
                : `${product.title.zh}是为需要${product.specifications.technology === 'PCAP' ? '多点触控功能和出色视觉清晰度的现代' : '在恶劣环境中耐用性和可靠操作的工业'}应用而设计的。凭借其${product.specifications.resolution}分辨率和响应灵敏的界面，它提供了卓越的用户体验。`}
            </p>
            <p className="mb-4">
              {locale === 'en'
                ? `The touchscreen features a ${product.specifications.dimensions} display area with ${product.specifications.technology} technology, making it ideal for ${product.specifications.technology === 'PCAP' ? 'consumer electronics, retail kiosks, and interactive displays' : 'manufacturing environments, outdoor installations, and specialized equipment'}. Its ${product.specifications.interface} interface ensures easy integration with various systems.`
                : `触摸屏具有${product.specifications.dimensions}的显示区域，采用${product.specifications.technology}技术，使其非常适合${product.specifications.technology === 'PCAP' ? '消费电子产品、零售终端和交互式显示器' : '制造环境、户外安装和专业设备'}。其${product.specifications.interface}接口确保与各种系统轻松集成。`}
            </p>
            <p>
              {locale === 'en'
                ? `For detailed technical specifications and integration guidelines, please download the product datasheet or contact our sales team for personalized assistance.`
                : `有关详细的技术规格和集成指南，请下载产品数据表或联系我们的销售团队获取个性化帮助。`}
            </p>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            {locale === 'en' ? 'Related Products' : '相关产品'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {getAllProducts()
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  locale={locale} 
                />
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params, locale }) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      product,
    },
  };
}

export async function getStaticPaths() {
  const products = getAllProducts();
  
  const paths = [];
  
  // Generate paths for all products in all locales
  ['en', 'zh'].forEach(locale => {
    products.forEach(product => {
      paths.push({
        params: { slug: product.slug },
        locale,
      });
    });
  });
  
  return {
    paths,
    fallback: false, // show 404 for non-existent slugs
  };
}