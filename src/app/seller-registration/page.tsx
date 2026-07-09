"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function SellerRegistrationPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Seller Registration")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Join thousands of sellers growing their business on Chrona. Start selling in minutes.")}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Why Sell on Chrona?")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("Access to millions of customers")}</li>
          <li>{t("Competitive commission rates")}</li>
          <li>{t("Fast payouts - every 7 days")}</li>
          <li>{t("Dedicated seller support")}</li>
          <li>{t("Easy inventory management tools")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Requirements")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("Valid GST registration")}</li>
          <li>{t("PAN card and bank account")}</li>
          <li>{t("Product catalog with images and descriptions")}</li>
          <li>{t("Agreement to seller policies")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Ready to Start?")}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Contact our seller onboarding team at sellers@chrona.com or call +91 1800-123-4567 (option 2).")}
        </p>
      </div>
    </div>
  );
}