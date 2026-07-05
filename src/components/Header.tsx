'use client';

import Link from 'next/link';
import { MapPin, Search, ChevronDown, User, RefreshCcw, ShoppingCart, X, Navigation } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useLocaleStore, LANGUAGES } from '@/store/useLocaleStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useState, useRef, useEffect } from 'react';
import { allMockProducts, getProductCategory } from '@/lib/mockData';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const cartItemsCount = useCartStore((state) => state.getTotalItems ? state.getTotalItems() : 0);
  const pathname = usePathname();
  
  const { t, language, setLanguage } = useTranslation();
  const location = useLocaleStore((state) => state.location);
  const setLocation = useLocaleStore((state) => state.setLocation);

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Suggestions states
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchContainerRefMobile = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (
        searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node) &&
        searchContainerRefMobile.current && !searchContainerRefMobile.current.contains(event.target as Node)
      ) {
        setIsSuggestionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempLocation.trim()) {
      setLocation(tempLocation.trim());
      setIsLocationModalOpen(false);
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    
    if (val.trim()) {
      const filtered = allMockProducts.filter((p) =>
        p.name.toLowerCase().includes(val.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(val.toLowerCase()))
      );
      setSuggestions(filtered.slice(0, 6)); // Top 6 matching products
      setIsSuggestionsOpen(true);

      // If user is currently on the search page, update the URL query parameter in real-time
      if (pathname === '/search') {
        router.replace(`/search?q=${encodeURIComponent(val.trim())}`, { scroll: false });
      }
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
      if (pathname === '/search') {
        router.replace('/search', { scroll: false });
      }
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                'User-Agent': 'Chrona-Ecommerce-App/1.0',
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            const address = data.address;
            const city = address.city || address.town || address.village || address.suburb || address.state || 'Detected City';
            const postcode = address.postcode || '';
            const formatted = `${city} ${postcode}`.trim();
            setLocation(formatted);
            setTempLocation(formatted);
          } else {
            throw new Error('Geocoding response failed');
          }
        } catch (error) {
          console.error('Error reverse geocoding:', error);
          const fallback = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;
          setLocation(fallback);
          setTempLocation(fallback);
        } finally {
          setIsDetecting(false);
          setIsLocationModalOpen(false);
        }
      },
      (error) => {
        console.error('Error getting geolocation:', error);
        setIsDetecting(false);
        alert('Could not auto-detect location. Please type it in manually.');
      },
      { timeout: 10000 }
    );
  };

  const renderSuggestionsDropdown = () => {
    if (!isSuggestionsOpen || suggestions.length === 0) return null;
    return (
      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 max-h-96 overflow-y-auto w-full">
        <div className="px-4 py-1 text-[10px] font-bold text-gray-400 border-b border-gray-100 uppercase tracking-wider mb-2">
          {t("Products")}
        </div>
        <div className="flex flex-col">
          {suggestions.map((product) => {
            const hasDiscount = product.discountedPrice !== undefined && product.discountedPrice < product.price;
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={() => {
                  setIsSuggestionsOpen(false);
                  setSearchQuery('');
                }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="relative w-10 h-10 rounded bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center p-1 border border-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={32}
                    height={32}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="text-xs font-bold text-gray-900 truncate hover:text-primary transition-colors">
                    {t(product.name)}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {t(getProductCategory(product.id))}
                  </span>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-900">
                    ₹{(hasDiscount ? product.discountedPrice : product.price).toLocaleString('en-IN')}
                  </span>
                  {hasDiscount && (
                    <span className="text-[9px] text-gray-400 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="px-4 pt-2 mt-1 border-t border-gray-100 text-center">
          <Link
            href={`/search?q=${encodeURIComponent(searchQuery)}`}
            onClick={() => setIsSuggestionsOpen(false)}
            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-block"
          >
            {t("View All Results")} →
          </Link>
        </div>
      </div>
    );
  };

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <header className="w-full bg-background border-b border-gray-200 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Location Selector */}
        <div 
          onClick={() => {
            setTempLocation(location);
            setIsLocationModalOpen(true);
          }}
          className="hidden md:flex items-center gap-2 cursor-pointer group"
        >
          <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-gray-500 font-medium">{t("Delivered To")}</span>
            <span className="text-xs font-bold whitespace-nowrap text-ellipsis max-w-[120px] overflow-hidden">
              {location}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden flex-1 md:flex max-w-xl relative" ref={searchContainerRef}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setIsSuggestionsOpen(false);
              }
            }}
            className="flex w-full border border-gray-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all"
          >
            <button type="submit" className="bg-primary text-white px-5 flex items-center justify-center hover:bg-primary-dark transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setIsSuggestionsOpen(true);
                }
              }}
              placeholder={t("Search Saree, Kurti and etc.")} 
              className="flex-1 px-4 py-2 outline-none text-sm bg-transparent"
            />
          </form>
          {renderSuggestionsDropdown()}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          
          {/* Language Selector */}
          <div className="relative" ref={langDropdownRef}>
            <div 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="hidden lg:flex items-center gap-1.5 cursor-pointer bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors select-none"
            >
              <span className="text-sm font-medium">{currentLang.flag} {currentLang.code}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 border-b border-gray-100">
                  Select Language
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                        language === lang.code ? 'bg-primary/5 text-primary font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="flex-1">{lang.name}</span>
                      <span className="text-xs text-gray-400 font-medium">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth State */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 cursor-pointer group justify-center overflow-hidden border border-gray-300 p-1 rounded-md">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.name || 'User'} width={32} height={32} className="w-8 h-8 object-cover rounded-full" />
              ) : (
                <User className="w-5 h-5 text-gray-500" />
              )}
              <div className="hidden lg:flex flex-col">
                <span className="text-xs font-bold text-gray-800">{user?.name || t("My Account")}</span>
              </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-primary-dark transition-colors shadow-sm whitespace-nowrap"
            >
              {t("Login / Registration")}
            </Link>
          )}

          {/* Return & Cart Icons */}
          <div className="flex items-center gap-5 ml-2">
            <Link href="/returns" className="flex flex-col items-center gap-1 hover:text-primary text-gray-700 transition-colors">
              <RefreshCcw className="w-6 h-6" />
              <span className="text-[10px] font-medium hidden sm:block">{t("Return")}</span>
            </Link>
            
            <Link href="/cart" className="relative flex flex-col items-center gap-1 hover:text-primary text-gray-700 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-[10px] font-medium hidden sm:block">{t("Cart")}</span>
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
      <div className="md:hidden px-4 pb-4 w-full relative" ref={searchContainerRefMobile}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
              setIsSuggestionsOpen(false);
            }
          }}
          className="flex w-full border border-gray-300 rounded-md overflow-hidden"
        >
          <button type="submit" className="bg-primary text-white px-4 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim()) {
                setIsSuggestionsOpen(true);
              }
            }}
            placeholder={t("Search Saree, Kurti and etc.")} 
            className="flex-1 px-4 py-2 outline-none text-sm bg-transparent"
          />
        </form>
        {renderSuggestionsDropdown()}
      </div>

      {/* Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">{t("Shipping Address")}</h3>
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <button
                type="button"
                onClick={detectLocation}
                disabled={isDetecting}
                className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors py-3 rounded-lg font-bold text-sm disabled:opacity-50"
              >
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
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    {t("City")}, {t("State")} {t("Or")} {t("Postal Code")}
                  </label>
                  <input
                    type="text"
                    value={tempLocation}
                    onChange={(e) => setTempLocation(e.target.value)}
                    placeholder="e.g. Pune 412208"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLocationModalOpen(false)}
                    className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors shadow-lg shadow-primary/20"
                  >
                    {t("Save & Continue")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
