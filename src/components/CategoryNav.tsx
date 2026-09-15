"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Shirt, Sparkles, Smartphone, Heart, ShoppingBag } from 'lucide-react';

const CATEGORIES = [
  { name: 'Man', href: '/category/man', icon: Shirt },
  { name: 'Woman', href: '/category/woman', icon: Sparkles },
  { name: 'Electronic', href: '/category/electronic', icon: Smartphone },
  { name: 'Cosmetics', href: '/category/cosmetics', icon: Heart },
  { name: 'Grocery', href: '/category/grocery', icon: ShoppingBag },
];

export default function CategoryNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <nav className="w-full bg-background border-b border-gray-200">
      {/* Mobile: horizontal scroll pills */}
      <div className="flex md:hidden overflow-x-auto scrollbar-hide gap-2 px-4 py-2 snap-x snap-mandatory items-center">
        {CATEGORIES.map((cat) => {
          const isActive = pathname === cat.href;
          const IconComponent = cat.icon;
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className={`flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-full text-xs font-semibold whitespace-nowrap snap-start shrink-0 transition-colors ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5 shrink-0" />
              <span>{t(cat.name)}</span>
            </Link>
          );
        })}
      </div>

      {/* Desktop: centered nav links */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center gap-8 py-3">
          {CATEGORIES.map((cat) => {
            const isActive = pathname === cat.href;
            return (
              <li key={cat.name}>
                <Link
                  href={cat.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {t(cat.name)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
