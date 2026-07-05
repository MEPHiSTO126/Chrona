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
import { mockProductDetail, allMockProducts, ProductDetail } from '@/lib/mockData';
import ProductImageGallery from '@/components/product/ProductImageGallery';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  
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
    // Determine the product to show
    if (id === 'f1') {
      setProduct(mockProductDetail);
      if (mockProductDetail.colors?.length > 0) {
        setSelectedColor(mockProductDetail.colors[0]);
      }
    } else {
      // Find item in allMockProducts and wrap it in ProductDetail structure
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
        // Fallback to default mock
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
      imageUrl: product.images[0]
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
    // Simple mock pincode validation: valid if it is a 6-digit number
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
    <div className="bg-white min-h-screen pb-20 font-urbanist text-gray-800">
      {/* Top Navbar details/breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/category/electronics" className="hover:text-primary transition-colors">Speaker</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-gray-600">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <span className="text-gray-300">|</span>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <RefreshCw className="w-4 h-4" />
            Compare
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Gallery & Core Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ProductImageGallery images={product.images} />
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <button
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all text-base shadow-sm border border-[#E0A96D] cursor-pointer ${
                  addedToCart
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-[#F5A623] hover:bg-[#E5951F] text-white hover:shadow'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'ADDED TO CART!' : 'ADD TO CART'}
              </button>
              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2.5 bg-[#B00020] hover:bg-[#900010] text-white transition-all text-base hover:shadow shadow-sm cursor-pointer"
              >
                <Zap className="w-5 h-5" />
                BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Info details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">{product.company}</span>
              <h1 className="text-2xl sm:text-3xl font-syne font-bold text-gray-900 mt-1 leading-tight">{product.name}</h1>
              
              {/* Rating and Stock */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-amber-800">{product.rating}</span>
                  <span className="text-xs text-amber-600">({product.reviewCount.toLocaleString()}+ reviews)</span>
                </div>
                {product.inStock ? (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-100">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Technical Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-gray-100 text-xs sm:text-sm text-gray-600">
              <div>
                <span className="block text-gray-400 font-medium">Category</span>
                <span className="font-semibold text-gray-900">{product.brand}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-medium">Company</span>
                <span className="font-semibold text-gray-900 truncate block">{product.company}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-medium">Brand/Model</span>
                <span className="font-semibold text-gray-900">{product.model}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-medium">Mfg Date</span>
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
                    <span className="text-xs font-bold bg-[#B00020]/10 text-[#B00020] px-2 py-0.5 rounded-md animate-pulse">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
              <span className="text-xs text-gray-400 font-medium">*Inclusive of all taxes</span>
            </div>

            {/* Social Interactions */}
            <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                52 likes
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-gray-400" />
                284 views
              </span>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-100" />
                Online Contact
              </a>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-900">Color</span>
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
              <span className="text-sm font-bold text-gray-900">Delivery</span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter Pincode"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary transition-all bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#B00020] hover:bg-[#900010] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm shadow-[#B00020]/10"
                >
                  CHECK
                </button>
              </form>
              
              {pincodeChecked && (
                <div className="text-xs mt-1 animate-in fade-in slide-in-from-top-1">
                  {pincodeSuccess ? (
                    <div className="flex flex-col gap-1 text-emerald-700 font-medium">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50" />
                        Delivery by 12 May, Wednesday | Free Delivery
                      </span>
                      <span className="text-gray-500 pl-4.5">COD Available</span>
                    </div>
                  ) : (
                    <span className="text-red-500 font-medium">Please enter a valid 6-digit pincode.</span>
                  )}
                </div>
              )}
            </div>

            {/* Trust Policy badging */}
            <div className="grid grid-cols-3 gap-2 border border-gray-100 rounded-2xl p-4 bg-gray-50/10">
              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="bg-[#B00020]/10 p-2.5 rounded-full">
                  <RefreshCw className="w-5 h-5 text-[#B00020]" />
                </div>
                <span className="text-xs font-bold text-gray-900">7 Days Return</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 border-x border-gray-100">
                <div className="bg-[#B00020]/10 p-2.5 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-[#B00020]" />
                </div>
                <span className="text-xs font-bold text-gray-900">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="bg-[#B00020]/10 p-2.5 rounded-full">
                  <Truck className="w-5 h-5 text-[#B00020]" />
                </div>
                <span className="text-xs font-bold text-gray-900">Secure Payment</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-900">Product Description</span>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">{product.description}</p>
            </div>

            {/* Seller Info card */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 text-[#B00020] font-bold text-lg w-12 h-12 rounded-xl flex items-center justify-center">
                  S
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{product.seller.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-gray-700">{product.seller.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-xs font-medium text-gray-500 max-w-xs sm:text-right">
                <span className="text-gray-900 font-bold">Seller Highlights</span>
                <span className="mt-1 leading-normal">{product.seller.offer}</span>
              </div>
            </div>

          </div>

        </div>

        {/* REVIEWS SECTION */}
        <section className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-2xl font-syne font-bold text-gray-900 mb-8">Customer reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Rating Summary Breakdown */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-400 font-semibold">out of 5</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} 
                  />
                ))}
                <span className="text-xs text-gray-400 font-medium ml-2">{totalReviewsCount.toLocaleString()} ratings</span>
              </div>

              {/* Rating Bars */}
              <div className="flex flex-col gap-2 mt-4">
                {product.ratingBreakdown.map((breakdown) => {
                  const percent = totalReviewsCount > 0 ? (breakdown.count / totalReviewsCount) * 100 : 0;
                  return (
                    <div key={breakdown.stars} className="flex items-center text-sm font-medium">
                      <span className="w-12 text-gray-500 shrink-0">{breakdown.stars} star</span>
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

              {/* Review call to action */}
              <div className="mt-6 p-5 border border-gray-100 rounded-2xl bg-gray-50/20 text-center sm:text-left">
                <h4 className="text-sm font-bold text-gray-900">Review this product</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed font-medium">
                  Share your thoughts with other customers to help them make the right choice.
                </p>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold py-2.5 px-4 rounded-xl border border-gray-200 transition-colors shadow-sm cursor-pointer">
                  Write a product review
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Customer media images row */}
              {product.reviews.some((r) => r.images && r.images.length > 0) && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4">Reviews with images</h4>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.reviews
                      .flatMap((r) => r.images || [])
                      .slice(0, 5)
                      .map((img, idx) => (
                        <div key={idx} className="relative w-18 h-18 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0 group cursor-pointer hover:border-primary transition-all">
                          <Image
                            src={img}
                            alt="Review media preview"
                            fill
                            className="object-cover group-hover:scale-105 transition-all"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

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
                        <span className="text-sm font-bold text-gray-900">{review.title}</span>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed font-medium">{review.body}</p>

                      {/* Review Specific Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2.5 mt-1">
                          {review.images.map((img, idx) => (
                            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                              <Image
                                src={img}
                                alt="User review asset"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

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
                          Helpful ({currentHelpful})
                        </button>
                        <button className="text-xs text-gray-400 hover:text-gray-600 font-semibold cursor-pointer">
                          Report
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
    </div>
  );
}
