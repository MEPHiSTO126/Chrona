"use client";

import { use } from "react";
import ProductCard from "@/components/product/ProductCard";
import { allMockProducts } from "@/lib/mockData";
import { useTranslation } from "@/hooks/useTranslation";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const { t } = useTranslation();
  const query = typeof params.q === 'string' ? params.q : '';

  const results = allMockProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t("Search Results for")} "{query}"
        </h1>
        <p className="text-gray-500">
          {t("Found")} {results.length} {t("product")}{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.map((product, index) => (
            <div 
              key={`${product.id}-${index}-${query}`} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500 text-lg">{t("No products found matching your search.")}</p>
        </div>
      )}
    </div>
  );
}
