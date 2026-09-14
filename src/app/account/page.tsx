'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  LogOut, 
  Headset, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useAddressStore } from '@/store/useAddressStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const addresses = useAddressStore((state) => state.addresses);
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push('/login?redirect=/account');
    }
  }, [isAuthenticated, router]);

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 font-urbanist text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary shrink-0">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-syne text-gray-900">{user?.name || t("Valued Customer")}</h1>
              <p className="text-gray-500 text-sm mt-0.5">{user?.email || "customer@chrona.com"}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t("Verified Account")}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {t("Log Out")}
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Saved Addresses */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">{t("Delivery Addresses")}</h2>
                    <p className="text-xs text-gray-400">{addresses.length} {t("saved address(es)")}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t("Manage your shipping destinations, default address, and quick GPS pins for rapid checkout.")}
              </p>
            </div>
            <Link
              href="/checkout/address"
              className="mt-5 text-primary text-xs font-bold flex items-center gap-1 hover:underline"
            >
              {t("Manage Addresses")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Orders & Tracking */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">{t("Orders & Returns")}</h2>
                    <p className="text-xs text-gray-400">{t("Track shipments & invoices")}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t("Check status, download tax invoices, or initiate 30-day instant order returns.")}
              </p>
            </div>
            <Link
              href="/help/returns"
              className="mt-5 text-primary text-xs font-bold flex items-center gap-1 hover:underline"
            >
              {t("View Return Policy")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Support & Help Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{t("Need assistance with your account?")}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{t("Our 24x7 customer support team is always available to assist you.")}</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-full text-xs transition-colors shrink-0 shadow-sm"
          >
            {t("Contact Support")}
          </Link>
        </div>

      </div>
    </div>
  );
}
