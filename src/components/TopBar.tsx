"use client";
import { Headset } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function TopBar() {
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  return (
    <div className="w-full bg-primary text-white text-xs sm:text-sm font-medium py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo on the left */}
        <Logo size={92} variant='dark-bg' />

        {/* Links on the right */}
        <div className="flex items-center gap-6">
          <a 
            href="/seller-registration" 
            className="hover:text-white/80 transition-opacity hidden sm:block"
          >
            Seller Registration
          </a>
          
          <div className="flex items-center gap-1.5 hover:text-white/80 transition-opacity cursor-pointer">
            <Headset className="w-4 h-4" />
            <span>24X7 Customer Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
