import Link from 'next/link';

const ProductCard = ({ product, locale }) => {
  // Use English as fallback if the current locale isn't available
  const title = product.title[locale] || product.title.en;
  const description = product.description[locale] || product.description.en;
  
  // Fallback image path if the product image doesn't exist
  const defaultImage = '/images/products/placeholder-product.jpg';
  
  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image || defaultImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to placeholder if image doesn't load
            e.target.src = defaultImage;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;