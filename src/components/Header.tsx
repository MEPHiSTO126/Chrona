'use client';

import Link from 'next/link';
import { MapPin, Search, ChevronDown, User, RefreshCcw, ShoppingCart, X, Navigation } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from './Logo';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useLocaleStore, LANGUAGES } from '@/store/useLocaleStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItemsCount = useCartStore((state) => state.getTotalItems ? state.getTotalItems() : 0);
  const pathname = usePathname();

  const { t, language, setLanguage } = useTranslation();
  const location = useLocaleStore((state) => state.location);
  const setLocation = useLocaleStore((state) => state.setLocation);

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSearchQuery(params.get('q') || '');
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempLocation.trim()) { setLocation(tempLocation.trim()); setIsLocationModalOpen(false); }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const trimmed = val.trim();
    
    // Debounce the navigation to avoid history spam
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    
    searchDebounceRef.current = setTimeout(() => {
      if (trimmed) {
        pathname !== '/search'
          ? router.push(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false })
          : router.replace(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false });
      } else if (pathname === '/search') {
        router.replace('/search', { scroll: false });
      }
    }, 300);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) { alert('Geolocation is not supported by your browser.'); return; }
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { 'User-Agent': 'Chrona-Ecommerce-App/1.0' } }
          );
          if (response.ok) {
            const data = await response.json();
            const addr = data.address;
            const city = addr.city || addr.town || addr.village || addr.suburb || addr.state || 'City';
            const formatted = `${city} ${addr.postcode || ''}`.trim();
            setLocation(formatted); setTempLocation(formatted);
          } else throw new Error('Failed');
        } catch {
          const fb = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;
          setLocation(fb); setTempLocation(fb);
        } finally { setIsDetecting(false); setIsLocationModalOpen(false); }
      },
      () => { setIsDetecting(false); alert('Could not auto-detect location. Please type it in manually.'); },
      { timeout: 10000 }
    );
  };

  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <header className="w-full bg-background border-b border-gray-200 relative z-40">
      {/* ── Main Row ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">

        {/* Mobile Logo */}
        <div className="flex sm:hidden shrink-0">
          <Logo size={72} variant="light-bg" />
        </div>

        {/* Location — desktop */}
        <div
          onClick={() => { setTempLocation(location); setIsLocationModalOpen(true); }}
          className="hidden md:flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-gray-500 font-medium">{t("Delivered To")}</span>
            <span className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[110px]">{location}</span>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full border border-gray-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <div className="bg-primary text-white px-4 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <input type="text" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("Search Saree, Kurti and etc.")} className="flex-1 px-3 py-2 outline-none text-sm bg-transparent" />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Language — desktop */}
          <div className="relative hidden lg:block" ref={langDropdownRef}>
            <div onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 cursor-pointer bg-gray-100 px-2.5 py-1.5 rounded-md hover:bg-gray-200 transition-colors select-none">
              <span className="text-sm font-medium">{currentLang.flag} {currentLang.code}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 border-b border-gray-100">Select Language</div>
                <div className="max-h-60 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${language === lang.code ? 'bg-primary/5 text-primary font-semibold' : 'text-gray-700'}`}>
                      <span className="text-base">{lang.flag}</span>
                      <span className="flex-1">{lang.name}</span>
                      <span className="text-xs text-gray-400 font-medium">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth — desktop */}
          {isAuthenticated ? (
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <div 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 cursor-pointer border border-gray-200 hover:border-primary/50 p-1.5 rounded-lg transition-colors select-none"
              >
                {user?.avatar
                  ? <Image src={user.avatar} alt={user.name || 'User'} width={28} height={28} className="w-7 h-7 object-cover rounded-full" />
                  : <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs"><User className="w-4 h-4" /></div>}
                <span className="text-xs font-bold text-gray-800 hidden lg:block">{user?.name || t("My Account")}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900 truncate">{user?.name || "User"}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user?.email || ""}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      {t("My Account & Orders")}
                    </Link>
                    <Link
                      href="/checkout/address"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {t("Saved Addresses")}
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        router.push('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      {t("Log Out")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block bg-primary text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-primary-dark transition-colors shadow-sm whitespace-nowrap">
              {t("Login")}
            </Link>
          )}

          {/* Return — desktop */}
          <Link href="/help/returns" className="hidden sm:flex flex-col items-center gap-0.5 hover:text-primary text-gray-700 transition-colors">
            <RefreshCcw className="w-5 h-5" />
            <span className="text-[9px] font-medium">{t("Return")}</span>
          </Link>

          {/* Cart — always visible */}
          <Link href="/cart" className="relative flex flex-col items-center gap-0.5 hover:text-primary text-gray-700 transition-colors">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[9px] font-medium hidden sm:block">{t("Cart")}</span>
            {isMounted && cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile Login/Account icon */}
          <Link href={isAuthenticated ? "/account" : "/login"} className="flex sm:hidden items-center justify-center text-gray-700">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* ── Mobile Info Bar: Location + Login CTA ─────────────────── */}
      <div className="md:hidden px-4 py-1.5 flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/60">
        <button
          onClick={() => { setTempLocation(location); setIsLocationModalOpen(true); }}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-primary transition-colors min-w-0"
        >
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate max-w-[140px] font-medium">{location}</span>
        </button>
        {!isAuthenticated ? (
          <Link href="/login" className="shrink-0 text-xs font-bold text-primary border border-primary px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-all">
            {t("Login")} / {t("Sign Up")}
          </Link>
        ) : (
          <Link href="/account" className="shrink-0 text-xs font-bold text-gray-700 hover:text-primary flex items-center gap-1">
            <span>👋 {user?.name?.split(' ')[0] || "Account"}</span>
          </Link>
        )}
      </div>

      {/* ── Mobile Search Bar ──────────────────────────────────────── */}
      <div className="md:hidden px-4 pb-3 pt-1.5 w-full">
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-primary text-white px-3.5 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <input type="text" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("Search products...")} className="flex-1 px-3 py-2.5 outline-none text-sm bg-transparent" />
        </form>
      </div>

      {/* ── Location Modal ─────────────────────────────────────────── */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md overflow-hidden shadow-2xl">
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">{t("Shipping Address")}</h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-white/80 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-5">
              <button type="button" onClick={detectLocation} disabled={isDetecting}
                className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 py-3 rounded-xl font-bold text-sm disabled:opacity-50">
                <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
                {isDetecting ? t("Saving...") : t("Detect My Location")}
              </button>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase">{t("Or")}</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <form onSubmit={handleLocationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t("City")}, {t("State")} {t("Or")} {t("Postal Code")}</label>
                  <input type="text" value={tempLocation} onChange={(e) => setTempLocation(e.target.value)}
                    placeholder="e.g. Lagos 100001"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm font-medium" required />
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setIsLocationModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors">{t("Save & Continue")}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
