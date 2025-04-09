// src/pages/admin/products/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../../components/layout/Layout';
import { getContentfulProducts } from '../../../utils/contentful';

const AdminProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  // Simple password protection for the admin page
  const checkPassword = (e) => {
    e.preventDefault();
    // Simple password for demo purposes - in a real app, use proper auth
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

  // Filter products based on search query and selected filter
  const filteredProducts = products.filter(product => {
    // First apply text search
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      product.title?.en?.toLowerCase().includes(query) ||
      product.title?.zh?.toLowerCase().includes(query) ||
      product.slug.toLowerCase().includes(query)
    );
    
    if (!matchesSearch) return false;
    
    // Then apply additional filters
    switch (filter) {
      case 'missing_chinese':
        return !product.title?.zh || product.title.zh === '' || product.title.zh === product.title.en;
      case 'missing_english':
        return !product.title?.en || product.title.en === '';
      case 'incomplete':
        return !product.description?.en || !product.description?.zh || 
               !product.features?.en?.length || !product.features?.zh?.length;
      default:
        return true;
    }
  });

  // Check if both languages are available for a product field
  const checkLanguageStatus = (product, field) => {
    const hasEnglish = !!product[field]?.en && product[field].en !== '';
    const hasChinese = !!product[field]?.zh && product[field].zh !== '';
    
    if (hasEnglish && hasChinese) {
      return { status: 'complete', label: 'Complete', color: 'bg-green-100 text-green-800' };
    } else if (hasEnglish || hasChinese) {
      return { status: 'partial', label: 'Partial', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { status: 'missing', label: 'Missing', color: 'bg-red-100 text-red-800' };
    }
  };

  return (
    <Layout title="Product Management | Admin">
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600">
                  Manage your product content in English and Chinese.
                </p>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <Link 
                  href="/admin/preview" 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Content Preview
                </Link>
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
            </div>
            
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Products</option>
                    <option value="missing_chinese">Missing Chinese</option>
                    <option value="missing_english">Missing English</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
              </div>
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
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Features
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                            No products found matching your criteria
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map(product => {
                          const titleStatus = checkLanguageStatus(product, 'title');
                          const descStatus = checkLanguageStatus(product, 'description');
                          const featStatus = checkLanguageStatus(product, 'features');
                          
                          return (
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
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${titleStatus.color}`}>
                                  {titleStatus.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${descStatus.color}`}>
                                  {descStatus.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${featStatus.color}`}>
                                  {featStatus.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link
                                  href={`/admin/products/edit/${product.slug}`}
                                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                                >
                                  Edit
                                </Link>
                                <Link
                                  href={`/products/${product.slug}`}
                                  className="text-gray-600 hover:text-gray-900"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Summary */}
            {!isLoading && !error && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-medium mb-2">Content Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-500 mb-1">Missing Chinese Titles</div>
                    <div className="text-2xl font-semibold">
                      {products.filter(p => !p.title?.zh || p.title.zh === '').length}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-500 mb-1">Missing Chinese Descriptions</div>
                    <div className="text-2xl font-semibold">
                      {products.filter(p => !p.description?.zh || p.description.zh === '').length}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-500 mb-1">Missing Chinese Features</div>
                    <div className="text-2xl font-semibold">
                      {products.filter(p => !p.features?.zh || p.features.zh.length === 0).length}
                    </div>
                  </div>
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