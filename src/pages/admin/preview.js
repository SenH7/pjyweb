import { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout/Layout';
import ContentfulPreview from '../../components/admin/ContentfulPreview';

const AdminPreview = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  // Simple password protection for the admin page
  // In a real app, you would use proper authentication
  const checkPassword = (e) => {
    e.preventDefault();
    // Simple password for demo purposes - in a real app, use proper auth
    if (password === 'q') {
      setIsAuthorized(true);
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    // You can add additional checks here if needed
    // This is just to prevent accidental access
  }, []);

  return (
    <Layout title="Admin Preview">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Contentful Content Preview</h1>
        
        {!isAuthorized ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="mb-4">Enter the admin password to continue:</p>
            <form onSubmit={checkPassword}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Access Admin Preview
              </button>
            </form>
          </div>
        ) : (
          <ContentfulPreview />
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default AdminPreview;