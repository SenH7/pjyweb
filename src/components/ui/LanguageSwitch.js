import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitch = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  
  const changeLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
  };
  
  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('zh')}
        className={`px-2 py-1 rounded ${i18n.language === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        aria-label="Switch to Chinese"
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSwitch;