// src/pages/certificates.js
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout/Layout';
import CertificateGallery from '../components/ui/CertificateGallery';

export default function Certificates() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <Layout
      title={locale === 'en' ? 'Certifications' : '认证'}
      description={locale === 'en' 
        ? 'View the quality certifications that set PJY Touchscreen apart in the industry.' 
        : '查看使PJY触摸屏在行业中脱颖而出的质量认证。'}
    >
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {locale === 'en' ? 'Our Certifications' : '我们的认证'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-600">
            {locale === 'en'
              ? 'Our commitment to quality and excellence is verified by these professional certifications.'
              : '我们对品质和卓越的承诺通过这些专业认证得到验证。'}
          </p>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'en' ? 'Quality Management' : '质量管理'}
            </h2>
            <p className="text-gray-700 mb-6">
              {locale === 'en'
                ? 'Our products is ISO9001:2015 certified, ensuring our products and services consistently meet customer requirements through an effective quality management system.'
                : '我们的产品通过ISO9001:2015认证，确保我们的产品和服务通过有效的质量管理体系持续满足客户需求。'}
            </p>
            
            {/* Certificate Gallery Component */}
            <CertificateGallery />
          </div>
          
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              {locale === 'en' ? 'Why Our Certifications Matter' : '为什么我们的认证很重要'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'en' ? 'Quality Assurance' : '质量保证'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'en'
                    ? 'Our certifications guarantee that all products meet strict international quality standards.'
                    : '我们的认证保证所有产品符合严格的国际质量标准。'}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'en' ? 'Regulatory Compliance' : '法规合规性'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'en'
                    ? 'We ensure all our products comply with the necessary regulations for international markets.'
                    : '我们确保所有产品符合国际市场所需的各项法规。'}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {locale === 'en' ? 'Customer Confidence' : '客户信任'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'en'
                    ? 'Our certifications provide customers with confidence in the reliability and quality of our products.'
                    : '我们的认证使客户对我们产品的可靠性和质量充满信心。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'en' 
              ? 'Ready to Work with a Certified Manufacturer?' 
              : '准备与认证制造商合作？'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            {locale === 'en'
              ? 'Contact us today to learn how our certified manufacturing processes can benefit your business.'
              : '立即联系我们，了解我们经认证的制造流程如何为您的业务带来益处。'}
          </p>
          <a 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-block"
          >
            {locale === 'en' ? 'Contact Us' : '联系我们'}
          </a>
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