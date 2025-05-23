// src/pages/contact.js
import { useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout/Layout';
import GoogleMap from '../components/ui/GoogleMap';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: false, message: locale === 'en' ? 'Sending...' : '发送中...' });

    // EmailJS service, template, and public key values
    // Replace these with your actual EmailJS values
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Prepare template parameters
    const templateParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not specified',
      message: formData.message,
      reply_to: formData.email,
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus({
          submitted: true,
          success: true,
          message: locale === 'en'
            ? 'Thank you for your message. We will contact you soon!'
            : '感谢您的留言。我们将尽快与您联系！'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setFormStatus({
          submitted: true,
          success: false,
          message: locale === 'en'
            ? 'Sorry, there was an error sending your message. Please try again later.'
            : '抱歉，发送您的消息时出错。请稍后再试。'
        });
      });
  };

  // Company address for the map
  const companyAddress = locale === 'en'
    ? 'Tianliao community, Yutang Street, Guangming District, Shenzhen, China'
    : '中国深圳市光明区玉塘街道田寮社区';

  return (
    <Layout
      title={locale === 'en' ? 'Contact Us' : '联系我们'}
      description={locale === 'en'
        ? 'Get in touch with PJY Touchscreen Manufacturing for inquiries, support, or partnership opportunities.'
        : '联系PJY触摸屏制造，了解咨询、支持或合作机会。'}
    >
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {locale === 'en' ? 'Contact Us' : '联系我们'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-600">
            {locale === 'en'
              ? 'Have questions about our products or services? Our team is here to help.'
              : '对我们的产品或服务有疑问？我们的团队随时为您提供帮助。'}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'en' ? 'Get In Touch' : '联系方式'}
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'en' ? 'Headquarters' : '总部'}
                </h3>
                <p className="text-gray-700 mb-1">
                  {locale === 'en' ? '7th Industrial area, Tianliao community, Yutang Street, Guangming District' : '光明区玉塘街道田寮社区第七工业区'}
                </p>
                <p className="text-gray-700 mb-1">
                  {locale === 'en' ? 'Shenzhen， Guangdong Province, 518132' : '广东省深圳市，518132'}
                </p>
                <p className="text-gray-700">
                  {locale === 'en' ? 'China, ' : '中国'}

                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'en' ? 'Contact Information' : '联系信息'}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">
                    {locale === 'en' ? 'Phone:' : '电话：'}
                  </span> 0755-29486693
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">
                    {locale === 'en' ? 'Fax:' : '传真：'}
                  </span> 0755-29486693
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">
                    {locale === 'en' ? 'QQ:' : 'QQ：'}
                  </span> 630095288
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">
                    {locale === 'en' ? 'Email:' : '邮箱：'}
                  </span> szpjytech@outlook.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'en' ? 'Business Hours' : '营业时间'}
                </h3>
                <p className="text-gray-700 mb-1">
                  {locale === 'en'
                    ? 'Monday - Friday: 9:00 AM - 6:00 PM'
                    : '周一至周五：上午9:00 - 下午6:00'}
                </p>
                <p className="text-gray-700">
                  {locale === 'en'
                    ? 'Saturday - Sunday: Closed'
                    : '周六至周日：休息'}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">
                {locale === 'en' ? 'Send Us a Message' : '给我们发送信息'}
              </h2>

              {formStatus.submitted ? (
                <div className={`p-4 rounded mb-6 ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {formStatus.message}
                </div>
              ) : null}

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      {locale === 'en' ? 'Your Name' : '您的姓名'}*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      {locale === 'en' ? 'Email Address' : '电子邮箱'}*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                    {locale === 'en' ? 'Company Name' : '公司名称'}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    {locale === 'en' ? 'Your Message' : '您的信息'}*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  {locale === 'en' ? 'Submit Message' : '提交信息'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {locale === 'en' ? 'Find Us' : '查找我们'}
          </h2>

          {/* Google Map Component */}
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <GoogleMap address={companyAddress} zoom={16} />
            ) : (
              <div className="bg-gray-300 h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-gray-600 mb-4">
                    {locale === 'en'
                      ? 'Google Maps API key is required to display the map.'
                      : '需要Google地图API密钥来显示地图。'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {locale === 'en'
                      ? 'Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.'
                      : '请在环境变量中设置NEXT_PUBLIC_GOOGLE_MAPS_API_KEY。'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional location info */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              {locale === 'en' ? 'How to Reach Us' : '如何到达'}
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'We are conveniently located in the Guangming District of Shenzhen, easily accessible by public transportation. If you need detailed directions, please contact us directly.'
                : '我们位于深圳市光明区，交通便利。如果您需要详细的路线指引，请直接联系我们。'}
            </p>
          </div>
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