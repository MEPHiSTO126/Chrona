"use client";

import { use } from "react";
import ProductCard from "@/components/product/ProductCard";
import { allMockProducts } from "@/lib/mockData";
import { useTranslation } from "@/hooks/useTranslation";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t } = useTranslation();
  
  // Map slug to category
  const slugToCategory: Record<string, string> = {
    'man': 'fashion',
    'woman': 'fashion',
    'electronic': 'electronics',
    'cosmetics': 'cosmetics',
    'grocery': 'grocery',
    'fashion': 'fashion',
    'electronics': 'electronics',
    'appliances': 'appliances',
  };
  
  const category = slugToCategory[slug] || slug;

  const products = allMockProducts.filter((product) =>
    product.category?.toLowerCase() === category.toLowerCase()
  );

  const displayName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t(displayName)}</h1>
        <p className="text-gray-500">{t("Explore our collection of")} {t(displayName).toLowerCase()}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500 text-lg">{t("No products found in this category.")}</p>
        </div>
      )}
    </div>
  );
}
