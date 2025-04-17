// src/components/ui/CertificateGallery.js
import { useTranslation } from 'next-i18next';

const CertificateGallery = () => {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  const certificates = [
    {
      id: 1,
      title: {
        en: 'Quality Management System Certification',
        zh: '质量管理体系认证证书'
      },
      image: '/images/certificates/certificate-en.jpg',
      description: {
        en: 'ISO9001:2015 Quality Management certification for Display R&D, production and sales services; Camera Sales Services',
        zh: 'ISO9001:2015质量管理认证，适用于显示器的研发、生产和销售服务；摄像头的销售服务'
      }
    },
    {
      id: 2,
      title: {
        en: 'Quality Management System Certification (Chinese)',
        zh: '质量管理体系认证证书（中文）'
      },
      image: '/images/certificates/certificate-zh.jpg',
      description: {
        en: 'Chinese version of our ISO9001:2015 Quality Management System certification',
        zh: 'ISO9001:2015质量管理体系认证证书的中文版本'
      }
    },
    {
      id: 3,
      title: {
        en: 'Product Certifications Collection',
        zh: '产品认证集合'
      },
      image: '/images/certificates/overall_certificate.jpg',
      description: {
        en: 'Our comprehensive collection of product certifications including CCC certification and other international standards',
        zh: '我们全面的产品认证集合，包括CCC认证和其他国际标准'
      }
    }
  ];

return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">
        {locale === 'en' ? 'Our Certifications' : '我们的认证'}
      </h2>
      
      <p className="mb-6 text-gray-700">
        {locale === 'en' 
          ? 'Our products is proud to maintain the highest quality standards in the industry, verified by these professional certifications:'
          : '我们以维持行业最高质量标准而自豪，这些专业认证是我们品质的保证：'}
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <a href={certificate.image} target="_blank" rel="noopener noreferrer">
                <img 
                  src={certificate.image} 
                  alt={certificate.title[locale]} 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{certificate.title[locale]}</h3>
              <p className="text-sm text-gray-600 mb-3">{certificate.description[locale]}</p>
              <a 
                href={certificate.image} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">{locale === 'en' ? 'View Certificate' : '查看证书'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateGallery;