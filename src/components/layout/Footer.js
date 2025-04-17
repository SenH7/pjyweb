import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Footer Logo */}
          <div className="flex items-center space-x-2">
            <img src="/images/foot_logo.png" alt="PJY" className="h-auto w-auto" />
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.title')}</h3>
            <p className="mb-2">{t('footer.address')}</p>
            <p className="mb-2">{t('footer.phone')}</p>
            <p className="mb-2">{t('footer.email')}</p>
          </div>
          
          {/* Quick Links */}
          <div>
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
                <Link href="/certificates" className="hover:text-gray-300 transition-colors">
                  {t('nav.certificates')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Telephone */}
          <div className="flex items-center space-x-2">
            <img src="/images/tell.png" alt="PJY" className="h-auto w-auto" />
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