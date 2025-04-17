// src/components/layout/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LanguageSwitch from '../ui/LanguageSwitch';
import SearchBar from '../ui/SearchBar';

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="PJY" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`nav-link ${router.pathname === '/' ? 'font-semibold' : ''}`}>
              {t('nav.home')}
            </Link>
            <Link href="/about" className={`nav-link ${router.pathname === '/about' ? 'font-semibold' : ''}`}>
              {t('nav.about')}
            </Link>
            <Link href="/products" className={`nav-link ${router.pathname.startsWith('/products') ? 'font-semibold' : ''}`}>
              {t('nav.products')}
            </Link>
            <Link href="/certificates" className={`nav-link ${router.pathname === '/certificates' ? 'font-semibold' : ''}`}>
              {t('nav.certificates') || 'Certificates'}
            </Link>
            <Link href="/contact" className={`nav-link ${router.pathname === '/contact' ? 'font-semibold' : ''}`}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Language Switch & Search */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <LanguageSwitch />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4 mb-4">
              <Link href="/" onClick={closeMenu} className={`nav-link ${router.pathname === '/' ? 'font-semibold' : ''}`}>
                {t('nav.home')}
              </Link>
              <Link href="/about" onClick={closeMenu} className={`nav-link ${router.pathname === '/about' ? 'font-semibold' : ''}`}>
                {t('nav.about')}
              </Link>
              <Link href="/products" onClick={closeMenu} className={`nav-link ${router.pathname.startsWith('/products') ? 'font-semibold' : ''}`}>
                {t('nav.products')}
              </Link>
              <Link href="/certificates" onClick={closeMenu} className={`nav-link ${router.pathname === '/certificates' ? 'font-semibold' : ''}`}>
                {t('nav.certificates') || 'Certificates'}
              </Link>
              <Link href="/contact" onClick={closeMenu} className={`nav-link ${router.pathname === '/contact' ? 'font-semibold' : ''}`}>
                {t('nav.contact')}
              </Link>
            </nav>
            <div className="flex flex-col space-y-4">
              <SearchBar />
              <LanguageSwitch />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;