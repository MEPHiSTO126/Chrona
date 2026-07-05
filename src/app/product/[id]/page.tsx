'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Share2, 
  RefreshCw, 
  ShieldCheck, 
  Truck, 
  Eye, 
  MessageCircle,
  Star,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShoppingCart,
  Zap,
  ThumbsUp
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { mockProductDetail, allMockProducts, ProductDetail, getProductCategory } from '@/lib/mockData';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import { useTranslation } from '@/hooks/useTranslation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { t } = useTranslation();
  
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeSuccess, setPincodeSuccess] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewsHelpful, setReviewsHelpful] = useState<Record<string, number>>({});
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (id === 'f1') {
      setProduct(mockProductDetail);
      if (mockProductDetail.colors?.length > 0) {
        setSelectedColor(mockProductDetail.colors[0]);
      }
    } else {
      const baseProduct = allMockProducts.find((p) => p.id === id);
      if (baseProduct) {
        const detailProduct: ProductDetail = {
          id: baseProduct.id,
          name: baseProduct.name,
          brand: 'Brand',
          company: 'Chrona Partner',
          model: baseProduct.name.split(' ')[0],
          dateOfManufacture: '12.12.2024',
          images: [baseProduct.imageUrl, baseProduct.imageUrl, baseProduct.imageUrl],
          price: baseProduct.price,
          discountedPrice: baseProduct.discountedPrice,
          rating: baseProduct.rating || 4.0,
          reviewCount: baseProduct.reviewCount || 10,
          inStock: true,
          colors: ['#1a1a1a', '#9ca3af'],
          description: baseProduct.description || 'No description available for this premium product.',
          highlightedTags: ['Premium', 'Genuine'],
          seller: {
            name: 'The Better Store',
            rating: 4.5,
            deliveryDays: 3,
            offer: '100% manufacturer warranty on this brand.',
          },
          ratingBreakdown: [
            { stars: 5, count: 5 },
            { stars: 4, count: 3 },
            { stars: 3, count: 1 },
            { stars: 2, count: 1 },
            { stars: 1, count: 0 },
          ],
          reviews: [
            {
              id: 'rev-1',
              author: 'Customer',
              rating: 5,
              title: 'Excellent product!',
              body: 'I am really satisfied with the product build quality and performance. Worth the money!',
              date: 'Reviewed on 12 June 2024',
              helpful: 4,
            }
          ]
        };
        setProduct(detailProduct);
        setSelectedColor(detailProduct.colors[0]);
      } else {
        setProduct(mockProductDetail);
        setSelectedColor(mockProductDetail.colors[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const finalPrice = product.discountedPrice ?? product.price;
    addItem({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      quantity: quantity,
      imageUrl: product.images[0],
      category: getProductCategory(product.id)
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode) return;
    setPincodeChecked(true);
    const isValid = /^\d{6}$/.test(pincode);
    setPincodeSuccess(isValid);
  };

  const handleHelpfulClick = (reviewId: string) => {
    if (likedReviews[reviewId]) {
      setReviewsHelpful(prev => ({
        ...prev,
        [reviewId]: (prev[reviewId] ?? 0) - 1
      }));
      setLikedReviews(prev => ({ ...prev, [reviewId]: false }));
    } else {
      setReviewsHelpful(prev => ({
        ...prev,
        [reviewId]: (prev[reviewId] ?? 0) + 1
      }));
      setLikedReviews(prev => ({ ...prev, [reviewId]: true }));
    }
  };

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const hasDiscount = product.discountedPrice !== undefined && product.discountedPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.discountedPrice ?? 0)) / product.price) * 100)
    : 0;

  const totalReviewsCount = product.ratingBreakdown.reduce((total, b) => total + b.count, 0);

  return (
    <div className="bg-white min-h-screen pb-24 lg:pb-20 font-urbanist text-gray-800">
      {/* Top Navbar details/breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">{t("Home")}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/category/electronics" className="hover:text-primary transition-colors">{t("Electronics")}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{t(product.name)}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Gallery & Core Actions */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            <ProductImageGallery images={product.images} />

            {/* Action Buttons — hidden on mobile (shown in sticky bar below) */}
            <div className="hidden lg:grid grid-cols-2 gap-4 mt-2">
              <button
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all text-base shadow-sm border border-[#E0A96D] cursor-pointer ${
                  addedToCart
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-[#F5A623] hover:bg-[#E5951F] text-white hover:shadow'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? t('ADDED TO CART!') : t('ADD TO CART')}
              </button>
              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2.5 bg-[#B00020] hover:bg-[#900010] text-white transition-all text-base hover:shadow shadow-sm cursor-pointer"
              >
                <Zap className="w-5 h-5" />
                {t("BUY NOW")}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Info details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">{t(product.company)}</span>
              <h1 className="text-2xl sm:text-3xl font-syne font-bold text-gray-900 mt-1 leading-tight">{t(product.name)}</h1>
              
              {/* Rating and Stock */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-amber-800">{product.rating}</span>
                  <span className="text-xs text-amber-600">({product.reviewCount.toLocaleString()}+ {t("reviews")})</span>
                </div>
                {product.inStock ? (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                    {t("In Stock")}
                  </span>
                ) : (
                  <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-100">
                    {t("Out of Stock")}
                  </span>
                )}
              </div>
            </div>

            {/* Technical Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-3 border-y border-gray-100 text-xs sm:text-sm text-gray-600">
              <div>
                <span className="block text-gray-400 font-medium">{t("Category")}</span>
                <span className="font-semibold text-gray-900">{t(getProductCategory(product.id))}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-medium">{t("Company")}</span>
                <span className="font-semibold text-gray-900 truncate block">{t(product.company)}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-medium">{t("Brand/Model")}</span>
                <span className="font-semibold text-gray-900">{t(product.brand)} / {t(product.model)}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-medium">{t("Date of Manufacture")}</span>
                <span className="font-semibold text-gray-900">{product.dateOfManufacture}</span>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 flex flex-col gap-1.5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900">
                  {formatPrice(hasDiscount ? (product.discountedPrice ?? product.price) : product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-gray-400 line-through font-medium">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs font-bold bg-[#B00020]/10 text-[#B00020] px-2 py-0.5 rounded-md">
                      {discountPercent}% {t("OFF")}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-900">{t("Select Color")}</span>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                        selectedColor === color
                          ? 'border-primary ring-2 ring-primary/20 scale-110 shadow-sm'
                          : 'border-white ring-1 ring-gray-200 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Delivery/Pincode check */}
            <div className="flex flex-col gap-3 p-4 border border-gray-100 rounded-2xl bg-gray-50/20">
              <span className="text-sm font-bold text-gray-900">{t("Delivery")}</span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 w-full">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder={t("Enter Pincode")}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary transition-all bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#B00020] hover:bg-[#900010] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  {t("CHECK")}
                </button>
              </form>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-900">{t("Product Description")}</span>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">{t(product.description)}</p>
            </div>

          </div>

        </div>

        {/* REVIEWS SECTION */}
        <section className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-2xl font-syne font-bold text-gray-900 mb-8">{t("Customer Reviews")}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Rating Summary Breakdown */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-400 font-semibold">{t("out of 5")}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} 
                  />
                ))}
                <span className="text-xs text-gray-400 font-medium ml-2">{totalReviewsCount.toLocaleString()} {t("ratings")}</span>
              </div>

              {/* Rating Bars */}
              <div className="flex flex-col gap-2 mt-4">
                {product.ratingBreakdown.map((breakdown) => {
                  const percent = totalReviewsCount > 0 ? (breakdown.count / totalReviewsCount) * 100 : 0;
                  return (
                    <div key={breakdown.stars} className="flex items-center text-sm font-medium">
                      <span className="w-12 text-gray-500 shrink-0">{breakdown.stars} {t("star")}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full mx-3 overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-gray-500 text-right shrink-0">{Math.round(percent)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Reviews Items */}
              <div className="flex flex-col gap-6 divide-y divide-gray-100">
                {product.reviews.map((review) => {
                  const currentHelpful = review.helpful + (reviewsHelpful[review.id] ?? 0);
                  const isHelpfulLiked = likedReviews[review.id];

                  return (
                    <div key={review.id} className="pt-6 first:pt-0 flex flex-col gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gray-900 block">{review.author}</span>
                          <span className="text-[10px] text-gray-400 font-semibold">{review.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-900">{t(review.title)}</span>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed font-medium">{t(review.body)}</p>

                      <div className="flex items-center gap-3.5 mt-2">
                        <button
                          onClick={() => handleHelpfulClick(review.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                            isHelpfulLiked 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {t("Helpful")} ({currentHelpful})
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* Sticky Bottom CTA Bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 px-4 py-3 z-30 shadow-lg">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            className={`py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm cursor-pointer border ${
              addedToCart
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-[#F5A623] hover:bg-[#E5951F] text-white border-[#E0A96D]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {addedToCart ? t('Added!') : t('ADD TO CART')}
          </button>
          <button
            onClick={handleBuyNow}
            className="py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-[#B00020] hover:bg-[#900010] text-white transition-all text-sm cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            {t("BUY NOW")}
          </button>
        </div>
      </div>
    </div>
  );
}
