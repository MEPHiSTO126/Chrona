"use client";
import Link from 'next/link';
import { Headset } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { useTranslation } from '@/hooks/useTranslation';

export default function TopBar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  return (
    <div className="w-full bg-primary text-white text-xs sm:text-sm font-medium py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo — hidden on mobile (Header shows logo instead) */}
        <div className="hidden sm:block">
          <Logo size={92} variant='dark-bg' />
        </div>

        {/* Links on the right */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto sm:ml-0">
          <Link
            href="/seller-registration"
            className="hover:text-white/80 transition-opacity hidden sm:block"
          >
            {t("Seller Registration")}
          </Link>

          <Link 
            href="/contact"
            className="flex items-center gap-1.5 hover:text-white/80 transition-opacity"
          >
            <Headset className="w-4 h-4 shrink-0" />
            <span className="hidden xs:block sm:block">{t("24X7 Customer Support")}</span>
            <span className="block sm:hidden text-[11px] font-semibold">Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
