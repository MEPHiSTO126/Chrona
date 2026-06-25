import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import {
  mockFlashSales,
  mockTrending,
  mockGadgets,
  mockAppliances,
  mockFashion,
  heroBannerImage,
} from "@/lib/mockData";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-12 bg-gray-50/50">
      {/* Hero Banner Section */}
      <section className="relative w-full max-w-[1400px] mx-auto overflow-hidden sm:px-6 lg:px-8 mt-4 mb-8">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm group">
          <Image
            src={heroBannerImage}
            alt="Summer 2024 Collection"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col justify-center px-8 sm:px-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 max-w-lg drop-shadow-md">
              Summer 2024 <br />
              <span className="text-primary">New Collection</span>
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-md">
              Discover the latest trends in fashion, electronics, and home essentials with vibrant aesthetics.
            </p>
            <Link
              href="/category/fashion"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full w-max transition-colors shadow-lg shadow-primary/30"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Flash Sales Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Flash Sales</h2>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                Ending Soon
              </span>
            </div>
            <Link href="/search?q=flash" className="text-primary hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFlashSales.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Trending Must-Haves */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Trending Must-Haves</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {mockTrending.map((product) => (
              <ProductCard key={product.id} {...product} className="h-full" />
            ))}
          </div>
        </section>

        {/* Promotional Music Banner */}
        <section className="relative w-full h-[200px] sm:h-[300px] rounded-2xl overflow-hidden shadow-sm bg-gray-900 flex items-center p-8 sm:p-16">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-purple-900/40 z-0"></div>
          <div className="relative z-10">
            <span className="text-primary-light font-medium tracking-wider text-sm uppercase mb-2 block">
              Enhance Your Audio
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              JBL Music Experience
            </h2>
            <Link
              href="/category/electronics"
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-2.5 px-6 rounded-full transition-colors"
            >
              Buy Now
            </Link>
          </div>
        </section>

        {/* Gadgets Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Gadgets Sell</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockGadgets.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Home Appliances Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Home Appliances</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockAppliances.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Top Fashion Deals */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Top Fashion Deals</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFashion.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
