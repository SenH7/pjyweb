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
        ? 'Learn about Peng Jinyuan products Manufacturing, our history, mission, and values.' 
        : '了解鹏锦源的产品制造，我们的历史、使命和价值观。'}
    >
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {locale === 'en' ? 'About Peng Jinyuan Technology Co., LTD' : '关于深圳市鹏锦源科技有限公司'}
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
                  ? 'Shenzhen Pengjinyuan Technology Co., Ltd. was founded in 2011. We are located in Shenzhen. We are a high-tech enterprise specializing in the production, sales, technical consultation, service and training of display devices, high-definition network cameras, and communication terminal equipment. The company mainly operates internal and external touch display screens, embedded and external embedded touch display screens, and our supporting products for communication equipment. The products are widely used in industries such as banking, transportation, new retail, new energy charging and swapping cabinets, new energy charging and swapping piles, electronics, and communications.'
                  : '深圳市鹏锦源科技有限公司,创立于2011年,公司总部位于深圳市,是一家生产、销售、技术咨询、服务与培训为一体的专业生产显示器,高清网络摄像头，通讯终端设备的高新技术企业。公司主要经营内、外置式触膜显示器，嵌入式、外嵌式触摸显示器及通讯设备其配套产品，产品广泛应用于银行、交通、新零售业、新能源充/换电柜，新能源充/换电桩，电子、通讯等行业。'}
              </p>
              <p className="mb-4 text-gray-700">
                {locale === 'en'
                  ? 'The company adheres to the core values of "achieving customer success, achieving win-win development and continuous progress", and follows the business policy of "customer-oriented, quality first, service-oriented, and achieving excellence". It advocates the corporate spirit of "seeking practicality and innovation, respecting value, and fulfilling responsibility". The company is committed to pursuing professionalism and concentration, actively and effectively seeking people-oriented cooperation and development, and establishing a service system and competitive advantage for the future. Since our establishment, the company has been guided by customer service, constantly seeking practicality and innovation, and developed multiple products with independent intellectual property rights to meet the constantly changing market demands. The company strictly implements relevant national laws and standards, and firmly implements the requirements of the 3C quality management system and product safety production. The company has two assembly production lines. The factory production strictly follows the quality management system for production, has a complete production process flow and QC process, and ensures stable and reliable product quality. The company has a quality assurance laboratory, strictly controls raw materials and product quality, and provides reliable test data. Our products are highly trusted by users for their high reliability, high stability and high safety. We have been widely applied in multiple provinces and regions across the country.'
                  : '公司秉着以“成就客户、共赢发展、不断进取”的核心价值观，以“客产为先、品质为本、服务为怀、成就卓越”的经营方针，倡导“求实创新，尊重价值，诺践责任”的企业精神，致力于追求专业与专注，积极而有效地谋求以人为本的合作与发展，建立起面向未来的服务体系与竞争优势。公司成立以来，坚持以客户服务为导向，不断求实创新，研制出多个具有自主知识产权的产品，以满足不断变化的市场需求。公司严格执行国家的相关法律和标准，坚定贯彻实施 3C质量管理体系和产品安全生产的要求。公司拥有两条装置装配生产线.工厂生产严格按照质量管理体系进行生产，具有完善的生产工艺流程及QC流程，确保产品质量稳定、可靠。公司设有品质保证实验室，严格控制原材料和产品品质，提供可靠的测试数据。公司的产品以其高可靠性、高稳定性和高安全性而备受广大用户信赖，现已在国内多个省区得到广泛的应用。'}
              </p>
              <p className="text-gray-700">
                {locale === 'en'
                  ? 'The company has a group of highly qualified engineering and technical personnel. 70% of them have over five years of experience in the technical development and project management of communication systems. We can provide customers with production, application, analysis, training and after-sales services, as well as research and development of new products, and constantly meet customer demands in a prompt and effective manner.'
                  : '公司拥有一批高素质的工程技术人员，70%具有5年以上通讯系统技术开发及项目管理经验，能快捷而有效地为客户提供生产、应用、分析和培训及售后服务，以及研究、开发新产品，不断满足客户需求。'}
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