"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function AffiliatePage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Become an Affiliate")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Join the Chrona Affiliate Program and earn commissions by promoting our products. It's free to join and easy to get started.")}
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("As an affiliate, you'll get a unique referral link to share with your audience. Earn competitive commissions on every qualifying purchase made through your link.")}
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{t("Benefits:")}</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>{t("Competitive commission rates")}</li>
            <li>{t("Real-time tracking and reporting")}</li>
            <li>{t("Monthly payouts")}</li>
            <li>{t("Dedicated affiliate support")}</li>
            <li>{t("Marketing materials provided")}</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm uppercase tracking-wider inline-block"
          >
            {t("Join Now")}
          </Link>
        </div>
      </div>
    </div>
  );
}