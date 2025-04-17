import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/layout/Layout';

export default function About() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <Layout
      title={locale === 'en' ? 'About Us' : '关于我们'}
      description={locale === 'en' 
        ? 'Learn about PJY Touchscreen Manufacturing, our history, mission, and values.' 
        : '了解PJY触摸屏制造，我们的历史、使命和价值观。'}
    >
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {locale === 'en' ? 'About PJY Touchscreen' : '关于PJY触摸屏'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-600">
            {locale === 'en'
              ? 'We are a leading manufacturer of high-quality touchscreen solutions for diverse industries.'
              : '我们是各行业高品质触摸屏解决方案的领先制造商。'}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="/images/company_default.jpg" 
                alt={locale === 'en' ? 'PJY Headquarters' : 'PJY总部'} 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                {locale === 'en' ? 'Our Story' : '我们的故事'}
              </h2>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Founded in 2005, PJY Touchscreen Manufacturing began with a vision to transform how people interact with technology. What started as a small team of engineers with a passion for innovation has grown into a global leader in touchscreen technology.'
                  : '成立于2005年，PJY触摸屏制造始于一个改变人们与技术互动方式的愿景。从一个对创新充满热情的小型工程师团队开始，已发展成为触摸屏技术的全球领导者。'}
              </p>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'Over the years, we have continuously invested in research and development to stay at the forefront of touchscreen technology. Our commitment to quality and innovation has earned us the trust of clients across various industries, from consumer electronics to industrial automation.'
                  : '多年来，我们不断投资研发，保持在触摸屏技术的前沿。我们对质量和创新的承诺赢得了各行业客户的信任，从消费电子到工业自动化。'}
              </p>
              <p className="text-gray-700">
                {locale === 'en'
                  ? 'Today, PJY is recognized for delivering touchscreen solutions that combine reliability, performance, and innovation. We continue to push the boundaries of what\'s possible, always with the goal of creating intuitive and seamless interactions between humans and technology.'
                  : '如今，PJY因提供兼具可靠性、性能和创新的触摸屏解决方案而受到认可。我们继续推动可能性的边界，始终以创造人与技术之间直观无缝的互动为目标。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {locale === 'en' ? 'Our Mission & Values' : '我们的使命和价值观'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                {locale === 'en' ? 'Our Mission' : '我们的使命'}
              </h3>
              <p className="text-gray-700">
                {locale === 'en'
                  ? 'To provide innovative touchscreen solutions that enhance user experiences and enable seamless human-machine interaction across all industries and applications.'
                  : '提供创新的触摸屏解决方案，提升用户体验，实现所有行业和应用中的无缝人机交互。'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                {locale === 'en' ? 'Our Values' : '我们的价值观'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {locale === 'en' ? 'Innovation: Constantly pushing technological boundaries' : '创新：不断突破技术边界'}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {locale === 'en' ? 'Quality: Uncompromising commitment to excellence' : '质量：对卓越的不懈追求'}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {locale === 'en' ? 'Reliability: Creating products that stand the test of time' : '可靠性：创造经得起时间考验的产品'}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {locale === 'en' ? 'Customer Focus: Designing solutions with users in mind' : '客户至上：设计以用户为中心的解决方案'}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {locale === 'en' ? 'Sustainability: Responsible manufacturing practices' : '可持续性：负责任的制造实践'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {locale === 'en' ? 'Our Leadership Team' : '我们的领导团队'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mb-4 relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                <img 
                  src="/images/default_image.png" 
                  alt="CEO" 
                  className="absolute w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-xl font-semibold">
                {locale === 'en' ? '' : ''}
              </h3>
              <p className="text-blue-600 mb-2">
                {locale === 'en' ? 'Chief Executive Officer' : '首席执行官'}
              </p>
              <p className="text-gray-600 max-w-xs mx-auto">
                {locale === 'en'
                  ? 'With over 20 years of experience in technology manufacturing,  leads our company vision and strategy.'
                  : '拥有超过20年的技术制造经验，领导着我们公司的愿景和战略。'}
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mb-4 relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                <img 
                  src="/images/default_image.png" 
                  alt="CTO" 
                  className="absolute w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-xl font-semibold">
                {locale === 'en' ? '' : ''}
              </h3>
              <p className="text-blue-600 mb-2">
                {locale === 'en' ? 'Chief Technology Officer' : '首席技术官'}
              </p>
              <p className="text-gray-600 max-w-xs mx-auto">
                {locale === 'en'
                  ? ' oversees our R&D efforts and ensures PJY remains at the cutting edge of touchscreen innovation.'
                  : '监督我们的研发工作，确保PJY保持在触摸屏创新的前沿。'}
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mb-4 relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                <img 
                  src="/images/default_image.png"
                  alt="COO" 
                  className="absolute w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-xl font-semibold">
                {locale === 'en' ? '' : ''}
              </h3>
              <p className="text-blue-600 mb-2">
                {locale === 'en' ? 'Chief Operations Officer' : '首席运营官'}
              </p>
              <p className="text-gray-600 max-w-xs mx-auto">
                {locale === 'en'
                  ? ' manages our manufacturing processes to ensure efficient, high-quality production.'
                  : '管理我们的制造流程，确保高效、高质量的生产。'}
              </p>
            </div>
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