'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  Trash2, 
  Heart, 
  ChevronDown, 
  Tag, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { useCartStore, CartItem } from '@/store/useCartStore';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    
    // Mock coupons: "CHRONA20" for 20% off, "WELCOME500" for 500 flat off
    const code = couponCode.trim().toUpperCase();
    const subtotal = getSubtotal();
    
    if (code === 'CHRONA20') {
      setDiscount(Math.round(subtotal * 0.2));
      setCouponApplied(true);
      setCouponError('');
    } else if (code === 'WELCOME500') {
      setDiscount(Math.min(500, subtotal));
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const subtotal = getSubtotal();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst - discount;
  
  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50/50 font-urbanist py-12 px-4">
        <div className="bg-red-50 p-6 rounded-full text-[#B00020] mb-5">
          <ShoppingBag className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-syne font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-500 text-sm mt-2 mb-8 text-center max-w-sm font-medium">
          Looks like you haven't added anything to your cart yet. Explore our latest arrivals!
        </p>
        <Link 
          href="/" 
          className="bg-[#B00020] hover:bg-[#900010] text-white font-bold py-3 px-8 rounded-full shadow-md shadow-[#B00020]/15 transition-all flex items-center gap-2"
        >
          Explore Collection
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-urbanist text-gray-800">
      
      {/* Checkout Stepper Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between max-w-3xl mx-auto">
            {/* Background connecting line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
            {/* Active connection line (first half) */}
            <div className="absolute left-0 w-1/2 top-1/2 -translate-y-1/2 h-1 bg-[#B00020] z-0"></div>
            
            {/* Step 1: My Cart */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#B00020] text-white flex items-center justify-center border-4 border-white shadow-sm font-bold">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#B00020] tracking-wider uppercase">MY CART</span>
            </div>

            {/* Step 2: Address */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white text-gray-400 flex items-center justify-center border-4 border-gray-100 shadow-sm font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">ADDRESS</span>
            </div>

            {/* Step 3: Payment */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white text-gray-400 flex items-center justify-center border-4 border-gray-100 shadow-sm font-bold">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4 sm:gap-6 relative hover:shadow-sm transition-all duration-300">
                {/* Item Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-2">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex flex-col gap-1 pr-12">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/product/${item.productId}`}>
                        {item.name}
                      </Link>
                    </h3>
                    <span className="text-xs text-gray-400 font-medium">Portable Wireless Speaker</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm font-bold">
                    {/* Qty Dropdown Selector */}
                    <div className="relative inline-block text-left">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 font-bold px-3 py-1.5 pr-8 rounded-lg outline-none cursor-pointer focus:border-primary text-xs hover:bg-gray-100 transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>Qty {num}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-gray-400 hover:text-[#B00020] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                      Move to Wishlist
                    </button>
                  </div>
                </div>

                {/* Item Price */}
                <div className="absolute right-5 top-5 text-right flex flex-col gap-1">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {formatPrice((item.discountedPrice ?? item.price) * item.quantity)}
                  </span>
                  {item.discountedPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Billing Details */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5 shadow-sm">
              <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100 pb-3">
                BILLING DETAILS
              </h2>

              <div className="flex flex-col gap-3.5 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <span>Price Total ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span className="text-red-500 font-bold">Free</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 animate-in fade-in">
                    <span>Coupon Applied ({couponCode.toUpperCase()})</span>
                    <span className="font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="h-px bg-gray-100 my-1"></div>

                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>TOTAL</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Delivery ETA */}
              <div className="text-xs font-semibold text-gray-400 text-center py-1">
                Estimated Delivery by: <span className="text-gray-800 font-bold">12 Oct, 2026</span>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                    }}
                    placeholder="Enter Coupon Code"
                    disabled={couponApplied}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-primary uppercase font-bold disabled:bg-gray-50 disabled:text-gray-400"
                  />
                  {couponApplied && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600">
                      ✓ APPLIED
                    </span>
                  )}
                </div>
                {!couponApplied ? (
                  <button
                    type="submit"
                    className="bg-[#B00020]/5 hover:bg-[#B00020]/10 text-[#B00020] text-xs font-bold px-4 py-2.5 rounded-xl border border-dashed border-[#B00020] transition-all cursor-pointer"
                  >
                    APPLY
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCouponApplied(false);
                      setDiscount(0);
                      setCouponCode('');
                    }}
                    className="bg-red-50 hover:bg-red-100 text-[#B00020] text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    REMOVE
                  </button>
                )}
              </form>
              
              {couponError && (
                <p className="text-xs text-red-500 font-medium -mt-2 animate-in fade-in">{couponError}</p>
              )}

              {/* Action Button */}
              <button
                onClick={() => router.push('/checkout/address')}
                className="w-full bg-[#B00020] hover:bg-[#900010] text-white font-bold py-4 rounded-xl shadow-md shadow-[#B00020]/15 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
