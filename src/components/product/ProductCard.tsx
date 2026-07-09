'use client';

import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';
import { useTranslation } from '@/hooks/useTranslation';

export interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  discountedPrice?: number;
  rating?: number;
  reviewCount?: number;
  saleEndTime?: string | Date;
  showDealLabel?: boolean;
  category?: string;
  className?: string;
}

function StarRating({ rating = 0, reviewCount }: { rating?: number; reviewCount?: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<svg key={i} className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);
    } else if (i === fullStars && hasHalf) {
      stars.push(<svg key={i} className="w-3 h-3 text-amber-400" viewBox="0 0 20 20"><defs><linearGradient id={`half-${i}`}><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="#D1D5DB" /></linearGradient></defs><path fill={`url(#half-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);
    } else {
      stars.push(<svg key={i} className="w-3 h-3 text-gray-300 fill-gray-300" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);
    }
  }
  return (
    <div className="flex items-center gap-0.5">
      <div className="flex">{stars}</div>
      {reviewCount !== undefined && <span className="text-[10px] text-gray-400 ml-1">({reviewCount})</span>}
    </div>
  );
}

export default function ProductCard({
  id, name, description, imageUrl, price, discountedPrice, rating, reviewCount,
  saleEndTime, showDealLabel = false, className = '',
}: ProductCardProps) {
  const { t } = useTranslation();
  const hasDiscount = discountedPrice !== undefined && discountedPrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;
  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col ${className}`}>

      {/* Deal Label + Countdown — stacked vertically to prevent overflow */}
      {showDealLabel && (
        <div className="flex flex-col gap-1 px-2.5 pt-2.5 pb-1">
          <span className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wide">
            🔥 {t("Deal of the Day")}
          </span>
          {saleEndTime && (
            <CountdownTimer targetDate={saleEndTime} variant="compact" className="text-[10px]" />
          )}
        </div>
      )}

      {/* Product Image */}
      <Link href={`/product/${id}`} className="block relative overflow-hidden">
        <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-3 sm:p-4 min-h-[110px]">
          <Image
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="px-2.5 sm:px-3 pb-3 pt-2 flex flex-col gap-1 flex-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {t(name)}
          </h3>
        </Link>
        {description && <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-1">{t(description)}</p>}
        {rating !== undefined && <StarRating rating={rating} reviewCount={reviewCount} />}
        <div className="flex items-center gap-1.5 mt-auto pt-1 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            {formatPrice(hasDiscount ? discountedPrice : price)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">{formatPrice(price)}</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-white bg-primary px-1.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
