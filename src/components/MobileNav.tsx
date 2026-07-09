'use client';

import Link from 'next/link';
import { Home, Search, ShoppingCart, User, LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/',          icon: Home,        label: 'Home'   },
  { href: '/search',    icon: Search,      label: 'Search' },
  { href: '/category/man', icon: LayoutGrid, label: 'Browse' },
  { href: '/cart',      icon: ShoppingCart, label: 'Cart'  },
  { href: '/login',     icon: User,         label: 'Account'},
];

export default function MobileNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.getTotalItems ? s.getTotalItems() : 0);
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hide on auth pages
  if (pathname === '/login' || pathname === '/register') return null;

  const items = NAV_ITEMS.map((item) => {
    if (item.href === '/login') {
      return { ...item, href: isAuthenticated ? '/account' : '/login', label: isAuthenticated ? 'Account' : 'Login' };
    }
    return item;
  });

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Blur glass background */}
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-2xl shadow-black/10">
        <div className="flex items-center justify-around px-2 py-1.5 pb-safe">
          {items.map(({ href, icon: Icon, label }) => {
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname.startsWith(href);

            const isCart = href === '/cart';

            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[52px]
                  ${isActive
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {/* Active pill indicator */}
                {isActive && (
                  <span className="absolute inset-0 bg-primary/8 rounded-xl" />
                )}

                {/* Cart badge */}
                <span className="relative">
                  <Icon
                    className={`w-5 h-5 transition-all duration-200 ${
                      isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
                    }`}
                  />
                  {isMounted && isCart && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-sm">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </span>

                <span
                  className={`text-[10px] font-semibold leading-none transition-all duration-200 ${
                    isActive ? 'font-bold text-primary' : ''
                  }`}
                >
                  {label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
