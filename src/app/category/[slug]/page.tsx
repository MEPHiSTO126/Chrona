export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
      <p className="text-gray-500">Products in the {categoryName} category will appear here.</p>
    </div>
  );
}
