"use client";

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { Hourglass } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center font-urbanist bg-gray-50/30 min-h-[70vh]">
      <div className="relative flex flex-col items-center mb-6">
        <div className="bg-[#B00020]/10 p-5 rounded-full text-[#B00020] mb-4 animate-bounce">
          <Hourglass className="w-12 h-12" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-syne font-extrabold text-primary/10 tracking-widest select-none uppercase">
          Chrona
        </h1>
        <h2 className="text-2xl sm:text-4xl font-syne font-bold text-gray-900 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap">
          {t("Coming Soon")}
        </h2>
      </div>
      <p className="text-gray-500 text-sm sm:text-base mt-8 max-w-md mx-auto font-medium leading-relaxed">
        {t("We're working hard to bring this page to life! Stay tuned for updates on our premium e-commerce features.")}
      </p>
      <Link 
        href="/"
        className="mt-10 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm uppercase tracking-wider"
      >
        {t("Continue Shopping")}
      </Link>
    </div>
  );
}
