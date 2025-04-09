import { useState, useEffect } from 'react';
import { getContentfulProducts } from '../../utils/contentful';

// This component is for development use only
// It allows you to preview Contentful content and check field availability
const ContentfulPreview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getContentfulProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products from Contentful');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      // For nested fields (e.g. ['specifications', 'dimensions'])
      let obj = product;
      for (const key of field) {
        if (!obj || !obj[key]) return false;
        obj = obj[key];
      }
      return true;
    }
    return false;
  };

  if (loading) return <div className="p-4">Loading products from Contentful...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 rounded-lg max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Contentful Products Preview</h2>
      <p className="mb-4 text-gray-600">
        This component helps you visualize your Contentful data structure and identify missing fields.
        For development use only.
      </p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Product</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Features</th>
              <th className="py-2 px-4 border-b text-left">Specifications</th>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{product.slug}</td>
                <td className="py-2 px-4">
                  <FieldStatus hasField={hasField(product, 'title')} />
                </td>
                <td className="py-2 px-4">
                  <FieldStatus hasField={hasField(product, 'description')} />
                </td>
                <td className="py-2 px-4">
                  <FieldStatus hasField={hasField(product, 'features')} />
                </td>
                <td className="py-2 px-4">
                  <FieldStatus hasField={hasField(product, 'specifications')} />
                </td>
                <td className="py-2 px-4">
                  <FieldStatus hasField={hasField(product, 'image')} />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => toggleExpand(product.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {expandedProduct === product.id ? 'Hide Details' : 'View Details'}
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
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-2 text-sm">
            {JSON.stringify(products.find(p => p.id === expandedProduct), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Small component to show field status
const FieldStatus = ({ hasField }) => {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      hasField ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {hasField ? 'Available' : 'Missing'}
    </span>
  );
};

export default ContentfulPreview;