// src/pages/admin/products/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../../components/layout/Layout';
import { getContentfulProducts } from '../../../utils/contentful';
import Link from 'next/link';

const AdminProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Simple password protection for the admin page
  const checkPassword = (e) => {
    e.preventDefault();
    // Simple password for demo purposes
    if (password === 'q') {
      setIsAuthorized(true);
      localStorage.setItem('contentful_admin_auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    // Check if user is already authorized
    if (localStorage.getItem('contentful_admin_auth') === 'true') {
      setIsAuthorized(true);
    }
    
    // Fetch products if authorized
    if (isAuthorized) {
      const fetchProducts = async () => {
        try {
          setIsLoading(true);
          const fetchedProducts = await getContentfulProducts();
          setProducts(fetchedProducts);
        } catch (err) {
          console.error('Error fetching products:', err);
          setError('Failed to fetch products from Contentful');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [isAuthorized]);

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product.title?.en?.toLowerCase().includes(query) ||
      product.title?.zh?.toLowerCase().includes(query) ||
      product.slug.toLowerCase().includes(query)
    );
  });

  return (
    <Layout title="Product Management">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Product Management</h1>
        
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
                Access Admin Area
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Admin Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                View your product content in English and Chinese.
              </p>
              <button 
                onClick={() => {
                  localStorage.removeItem('contentful_admin_auth');
                  setIsAuthorized(false);
                }}
                className="px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </div>

            <div className="mb-4">
              <Link
                href='/admin/preview'
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Preview Products
              </Link>
            </div>
            
            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Products Table */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Slug
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          EN Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ZH Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            No products found matching your criteria
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map(product => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={product.image || '/images/products/placeholder.jpg'} 
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.title?.en || 'Untitled Product'}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ID: {product.id.substring(0, 8)}...
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.slug}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {product.title?.en || 
                                <span className="text-red-500">Missing</span>
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {product.title?.zh || 
                                <span className="text-red-500">Missing</span>
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.image ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Available
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Missing
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default AdminProductsPage;