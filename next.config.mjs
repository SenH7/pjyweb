import nextI18nConfig from './next-i18next.config.js';

const { i18n } = nextI18nConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['images.ctfassets.net'],
  },
};

export default nextConfig;
