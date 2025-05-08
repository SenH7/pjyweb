import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import emailjs from '@emailjs/browser';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Add page transition effect
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

    const handleRouteChange = () => {
      // Scroll to top on page change
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);