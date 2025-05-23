import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title, description }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  
  const pageTitle = title || t('site.title');
  const pageDescription = description || t('site.description');

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Add alternate links for language versions */}
        {router.locales?.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            href={`${process.env.NEXT_PUBLIC_SITE_URL}${locale === router.defaultLocale ? '' : `/${locale}`}${router.pathname}`}
            hrefLang={locale}
          />
        ))}
      </Head>
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;