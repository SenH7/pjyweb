import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">PJY</h3>
            <p className="mb-2">{t('footer.address')}</p>
            <p className="mb-2">{t('footer.phone')}</p>
            <p className="mb-2">{t('footer.email')}</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('nav.home')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-300 transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter (optional) */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Stay updated with our latest products and news.</p>
            {/* In a real implementation, this would connect to a newsletter service */}
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-gray-800 focus:outline-none"
                aria-label="Email for newsletter"
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white transition-colors"
                aria-label="Subscribe to newsletter"
              >
                →
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;