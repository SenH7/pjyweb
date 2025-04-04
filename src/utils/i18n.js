import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

/**
 * Get server-side translations
 * @param {string} locale - Current locale
 * @param {string[]} namespaces - Translation namespaces to load
 * @returns {Promise<Object>} Server-side props with translations
 */
export const getI18nProps = async (locale, namespaces = ['common']) => {
  return {
    ...(await serverSideTranslations(locale, namespaces)),
  };
};

/**
 * Get server-side props for a page with i18n support
 * @param {Function} getAdditionalProps - Function to get additional props
 * @param {string[]} namespaces - Translation namespaces to load
 * @returns {Function} getServerSideProps function
 */
export const withI18n = (getAdditionalProps = () => ({}), namespaces = ['common']) => {
  return async (context) => {
    const { locale } = context;
    const i18nProps = await getI18nProps(locale, namespaces);
    const additionalProps = await getAdditionalProps(context);
    
    return {
      props: {
        ...i18nProps,
        ...additionalProps,
      },
    };
  };
};