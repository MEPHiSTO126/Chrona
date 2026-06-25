import ProductCard from "@/components/product/ProductCard";
import { allMockProducts } from "@/lib/mockData";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Simple mock filtering based on slug text matching product names
  const products = allMockProducts.filter((product) =>
    product.name.toLowerCase().includes(slug.toLowerCase()) || 
    (slug === 'electronics' && product.name.includes('Smart')) ||
    (slug === 'fashion' && product.name.includes('Sneakers')) ||
    (slug === 'appliances' && product.name.includes('Purifier'))
  );

  // If no products match, fallback to some items
  const displayProducts = products.length > 0 ? products : allMockProducts.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
        <p className="text-gray-500">Explore our collection of {categoryName.toLowerCase()}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayProducts.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} {...product} />
        ))}
      </div>
    </div>
  );
}
