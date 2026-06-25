'use client';

import Link from 'next/link';
import { MapPin, Search, ChevronDown, User, RefreshCcw, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';

export default function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const cartItemsCount = useCartStore((state) => state.getTotalItems ? state.getTotalItems() : 0);
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  return (
    <header className="w-full bg-background border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Location Selector */}
        <div className="hidden md:flex items-center gap-2 cursor-pointer group">
          <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium">Delivered To</span>
            <span className="text-xs font-bold">Pune 412208</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden flex-1 md:flex max-w-xl">
          <div className="flex w-full border border-gray-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <button className="bg-primary text-white px-5 flex items-center justify-center hover:bg-primary-dark transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder="Search Saree, Kurti and etc." 
              className="flex-1 px-4 py-2 outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          
          {/* Language Selector */}
          <div className="hidden lg:flex items-center gap-1 cursor-pointer bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors">
            <span className="text-sm font-medium">🇮🇳 EN</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          {/* Auth State */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 cursor-pointer group justify-center overflow-hidden border border-gray-300">
                {user?.avatar ? (
                  <Image src={user.avatar} alt={user.name || 'User'} width={40} height={40} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              <div className="hidden lg:flex flex-col">
                <span className="text-xs font-bold text-gray-800">{user?.name || 'My Account'}</span>
              </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-primary-dark transition-colors shadow-sm whitespace-nowrap"
            >
              Login / Registration
            </Link>
          )}

          {/* Return & Cart Icons */}
          <div className="flex items-center gap-5 ml-2">
            <Link href="/returns" className="flex flex-col items-center gap-1 hover:text-primary text-gray-700 transition-colors">
              <RefreshCcw className="w-6 h-6" />
              <span className="text-[10px] font-medium hidden sm:block">Return</span>
            </Link>
            
            <Link href="/cart" className="relative flex flex-col items-center gap-1 hover:text-primary text-gray-700 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-[10px] font-medium hidden sm:block">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
          
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4 w-full">
        <div className="flex w-full border border-gray-300 rounded-md overflow-hidden">
          <button className="bg-primary text-white px-4 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            placeholder="Search Saree, Kurti and etc." 
            className="flex-1 px-4 py-2 outline-none text-sm bg-transparent"
          />
        </div>
      </div>
    </header>
  );
}
