// src/pages/admin/products/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../../../components/layout/Layout';
import ContentfulProductForm from '../../../../components/admin/ContentfulProductForm';
import { getProductBySlug } from '../../../../utils/search';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  // Simple password protection for the admin page
  const checkPassword = (e) => {
    e.preventDefault();
    // Simple password for demo purposes - in a real app, use proper auth
    if (password === 'contentful-admin') {
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
    
    // Fetch product data if authorized and ID is available
    if (isAuthorized && id) {
      const fetchProduct = async () => {
        try {
          setIsLoading(true);
          // In a real implementation, you would have a dedicated admin API
          // Here we're using the public API for demo purposes
          const productData = await getProductBySlug(id);
          setProduct(productData);
        } catch (err) {
          console.error('Error fetching product:', err);
          setError('Failed to fetch product. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [isAuthorized, id]);

  const handleSaveProduct = async (formData) => {
    // In a real app, this would call the Contentful Management API
    // For this demo, we'll just simulate a successful update
    console.log('Product data to update:', formData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the local state
    setProduct(formData);
    
    alert('Product updated successfully! (Note: This is a simulation, no actual update is performed in Contentful)');
    return true;
  };

  return (
    <Layout title="Edit Product | Admin">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        
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
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : product ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ContentfulProductForm 
                  product={product} 
                  onSave={handleSaveProduct} 
                />
              </div>
            ) : (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                Product not found. Please check the ID and try again.
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

export default EditProductPage;