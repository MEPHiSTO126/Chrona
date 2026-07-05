"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

const CATEGORIES = [
  { name: 'Man', href: '/category/man', emoji: '👔' },
  { name: 'Woman', href: '/category/woman', emoji: '👗' },
  { name: 'Electronic', href: '/category/electronic', emoji: '📱' },
  { name: 'Cosmetics', href: '/category/cosmetics', emoji: '💄' },
  { name: 'Grocery', href: '/category/grocery', emoji: '🛒' },
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
      <div className="flex md:hidden overflow-x-auto scrollbar-hide gap-2 px-4 py-2.5 snap-x snap-mandatory">
        {CATEGORIES.map((cat) => {
          const isActive = pathname === cat.href;
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap snap-start shrink-0 transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span>{cat.emoji}</span>
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
