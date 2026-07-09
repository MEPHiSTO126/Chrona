'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Trash2,
  ChevronDown,
  ArrowRight,
  ShoppingBag,
  Package
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const { t } = useTranslation();

  // Recalculate discount when subtotal changes (cart items updated)
  useEffect(() => {
    if (couponApplied && couponCode) {
      const code = couponCode.trim().toUpperCase();
      const subtotal = getSubtotal();
      if (code === 'CHRONA20') {
        setDiscount(Math.round(subtotal * 0.2));
      } else if (code === 'WELCOME500') {
        setDiscount(Math.min(500, subtotal));
      }
    }
  }, [getSubtotal, couponApplied, couponCode]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
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
      setCouponError(t('Invalid coupon code'));
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const subtotal = getSubtotal();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst - discount;

  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50/50 font-urbanist py-12 px-4">
        <div className="bg-red-50 p-6 rounded-full text-primary mb-5">
          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <h1 className="text-xl sm:text-2xl font-syne font-bold text-gray-900">{t("Your cart is empty")}</h1>
        <p className="text-gray-500 text-sm mt-2 mb-8 text-center max-w-sm font-medium">
          {t("Looks like you haven't added anything to your cart yet. Explore our latest arrivals!")}
        </p>
<Link
          href="/"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center gap-2"
        >
          {t("Continue Shopping")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-28 sm:pb-20 font-urbanist text-gray-800">

      {/* Checkout Stepper Header */}
      <div className="bg-white border-b border-gray-200 py-4 sm:py-6 mb-5 sm:mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between max-w-xs sm:max-w-3xl mx-auto">
            {/* Background line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0"></div>
            {/* Active line */}
            <div className="absolute left-0 w-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-primary z-0"></div>

            {/* Step 1: Cart */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm font-bold">
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-primary tracking-wider uppercase">{t("Cart")}</span>
            </div>

            {/* Step 2: Address */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-400 flex items-center justify-center border-4 border-gray-100 shadow-sm">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 tracking-wider uppercase hidden sm:block">{t("Shipping Address")}</span>
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase block sm:hidden">Address</span>
            </div>

            {/* Step 3: Payment */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-400 flex items-center justify-center border-4 border-gray-100 shadow-sm">
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 tracking-wider uppercase hidden sm:block">{t("Payment Details")}</span>
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase block sm:hidden">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-3 sm:p-5 border border-gray-100 flex gap-3 sm:gap-6 hover:shadow-sm transition-all duration-300">
                {/* Item Image */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-2">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} width={100} height={100} className="object-contain w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Package className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 hover:text-primary transition-colors pr-1">
                      <Link href={`/product/${item.productId}`}>{t(item.name)}</Link>
                    </h3>
                    {item.category && (
                      <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">{t(item.category)}</span>
                    )}
                    {/* Price — shown inline on mobile */}
                    <div className="mt-1 flex items-baseline gap-1.5 sm:hidden">
                      <span className="text-sm font-bold text-gray-900">
                        {formatPrice((item.discountedPrice ?? item.price) * item.quantity)}
                      </span>
                      {item.discountedPrice && (
                        <span className="text-[10px] text-gray-400 line-through">{formatPrice(item.price * item.quantity)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    {/* Qty Selector */}
                    <div className="relative inline-block">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="appearance-none bg-gray-50 border border-gray-200 text-gray-800 font-bold px-2.5 py-1 pr-6 rounded-lg outline-none cursor-pointer focus:border-primary text-xs hover:bg-gray-100 transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>Qty {num}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs font-bold hidden sm:block">{t("Remove")}</span>
                  </Button>
                  </div>
                </div>

                {/* Item Price — desktop only */}
                <div className="hidden sm:flex flex-col items-end justify-start gap-1 shrink-0">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {formatPrice((item.discountedPrice ?? item.price) * item.quantity)}
                  </span>
                  {item.discountedPrice && (
                    <span className="text-xs text-gray-400 line-through">{formatPrice(item.price * item.quantity)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 shadow-sm">
              <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100 pb-3">
                {t("Order Summary")}
              </h2>

              <div className="flex flex-col gap-3 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <span>{t("Subtotal")} ({items.reduce((acc, i) => acc + i.quantity, 0)} {t("items")})</span>
                  <span className="text-gray-900 font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("Shipping")}</span>
                  <span className="text-red-500 font-bold">{t("Free")}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                    <span>{t("Coupon Applied")} ({couponCode.toUpperCase()})</span>
                    <span className="font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="h-px bg-gray-100 my-1"></div>
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>{t("Total")}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Coupon */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                    placeholder={t("Enter Coupon Code")}
                    disabled={couponApplied}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-primary uppercase font-bold disabled:bg-gray-50 disabled:text-gray-400"
                  />
                  {couponApplied && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600">✓ {t("Applied")}</span>
                  )}
                </div>
                {!couponApplied ? (
                  <Button type="submit" variant="outline" className="text-xs font-bold px-3 py-2.5 rounded-xl border-dashed border-primary text-primary hover:bg-primary/5 transition-all cursor-pointer">
                    {t("APPLY")}
                  </Button>
                ) : (
                  <Button type="button" variant="secondary" onClick={() => { setCouponApplied(false); setDiscount(0); setCouponCode(''); }} className="text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer">
                    {t("Remove")}
                  </Button>
                )}
              </form>
              {couponError && <p className="text-xs text-red-500 font-medium -mt-2">{couponError}</p>}

              {/* Checkout Button — visible on desktop */}
              <Button
                onClick={() => router.push('/checkout/address')}
                className="hidden sm:flex w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md transition-all text-sm items-center justify-center gap-2 cursor-pointer"
              >
                {t("Proceed to Checkout")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Checkout Bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-gray-200 px-4 py-3 z-30 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">{t("Total")}</span>
            <span className="text-base font-extrabold text-gray-900">{formatPrice(total)}</span>
          </div>
          <Button
            onClick={() => router.push('/checkout/address')}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
          >
            {t("Proceed to Checkout")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

    </div>
  );
}
