import { useState, useEffect } from 'react';
import { getContentfulProducts } from '../../utils/contentful';
import contentful from '../../utils/contentful'; // Import the default export
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';

const AdminPreview = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [issuesFound, setIssuesFound] = useState([]);
  // Add a state for test results
  const [testResult, setTestResult] = useState(null);

  // Simple password protection for the admin page
  // In a real app, you would use proper authentication
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

  // Add the test function
  const runTest = async () => {
    console.log("Running localization test...");
    const result = await contentful.testLocalizedFields();
    console.log("Test result:", result);
    setTestResult(result);
  };

  useEffect(() => {
    if (localStorage.getItem('contentful_admin_auth') === 'true') {
      setIsAuthorized(true);
    }

    if (isAuthorized) {
      const fetchProducts = async () => {
        try {
          const fetchedProducts = await getContentfulProducts();
          setProducts(fetchedProducts);

          // Check for common content issues
          const issues = [];
          fetchedProducts.forEach(product => {
            // Check if Chinese title is missing
            if (!product.title?.zh || product.title.zh === product.title.en) {
              issues.push({
                productId: product.id,
                productSlug: product.slug,
                issue: 'Missing Chinese title or same as English',
                field: 'title.zh'
              });
            }

          });

          setIssuesFound(issues);
        } catch (err) {
          console.error('Error fetching products:', err);
          setError('Failed to fetch products from Contentful');
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }

  }, [isAuthorized]);

  const toggleExpand = (productId) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
    }
  };

  // Helper to check if a product has a field
  const hasField = (product, field) => {
    if (typeof field === 'string') {
      return !!product[field];
    } else if (Array.isArray(field)) {
      // For nested fields (e.g. ['title', 'zh'])
      let obj = product;
      for (const key of field) {
        if (!obj || !obj[key]) return false;
        obj = obj[key];
      }
      return true && obj !== '';
    }
    return false;
  };

  // Helper to show language status
  const LanguageStatus = ({ product, field }) => {
    const enField = hasField(product, [field, 'en']);
    const zhField = hasField(product, [field, 'zh']);

    return (
      <div className="space-y-1">
        <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${enField ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          EN: {enField ? 'OK' : 'Missing'}
        </div>
        <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${zhField ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          ZH: {zhField ? 'OK' : 'Missing'}
        </div>
      </div>
    );
  };

  if (loading) return <div className="p-4">Loading products from Contentful...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;


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
          <div className="p-4 bg-gray-50 rounded-lg max-w-4xl mx-auto my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Contentful Products Preview</h2>
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
                href='/admin/products'
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Manage Products
              </Link>
            </div>
            {/* Add the test button here */}
            <div className="mb-4">
              <button
                onClick={runTest}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test Localization
              </button>

              {/* Optionally show test results */}
              {testResult && (
                <div className="mt-4 p-4 bg-gray-100 rounded overflow-auto max-h-60">
                  <h3 className="font-bold">Test Results:</h3>
                  <pre className="text-xs">{JSON.stringify(testResult, null, 2)}</pre>
                </div>
              )}


            </div>

            <p className="mb-4 text-gray-600">
              This component helps you visualize your Contentful data structure and identify missing fields.
              For development use only.
            </p>

            {/* Issues summary */}
            {issuesFound.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Content Issues Found ({issuesFound.length})</h3>
                <div className="bg-red-50 border border-red-200 rounded-md p-4 max-h-48 overflow-y-auto">
                  <ul className="list-disc pl-5 space-y-1">
                    {issuesFound.map((issue, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{issue.productSlug}</span>: {issue.issue} ({issue.field})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Products table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Product ID</th>
                    <th className="py-2 px-4 border-b text-left">Slug</th>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">Image</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm font-mono">{product.id.substring(0, 8)}...</td>
                      <td className="py-2 px-4">{product.slug}</td>
                      <td className="py-2 px-4">
                        <LanguageStatus product={product} field="title" />
                      </td>
                      <td className="py-2 px-4">
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
                      <td className="py-2 px-4">
                        <button
                          onClick={() => toggleExpand(product.id)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          {expandedProduct === product.id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product details when expanded */}
            {expandedProduct && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Product Details: {products.find(p => p.id === expandedProduct)?.title?.en || 'Unknown'}
                </h3>

                {/* Show multilingual fields in a more readable format */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded border">
                    <h4 className="font-medium mb-1">English Title:</h4>
                    <p>{products.find(p => p.id === expandedProduct)?.title?.en || 'Missing'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <h4 className="font-medium mb-1">Chinese Title:</h4>
                    <p>{products.find(p => p.id === expandedProduct)?.title?.zh || 'Missing'}</p>
                  </div>
                </div>

                {/* Raw JSON data */}
                <div className="mt-4">
                  <h4 className="font-medium mb-1">Raw Product Data:</h4>
                  <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-2 text-sm">
                    {JSON.stringify(products.find(p => p.id === expandedProduct), null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
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