import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product, locale }) => {
  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title[locale]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title[locale]}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description[locale]}</p>
      </div>
    </Link>
  );
};

export default ProductCard;