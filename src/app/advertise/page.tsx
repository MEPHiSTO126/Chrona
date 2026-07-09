"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function AdvertisePage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Advertise with Us")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Reach millions of engaged shoppers with targeted advertising on Chrona.")}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Advertising Options")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("Sponsored product listings")}</li>
          <li>{t("Banner ads on category pages")}</li>
          <li>{t("Homepage featured placements")}</li>
          <li>{t("Email newsletter sponsorships")}</li>
          <li>{t("Push notification campaigns")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Why Advertise on Chrona?")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("High intent audience - people actively shopping")}</li>
          <li>{t("Detailed targeting by category, demographics, behavior")}</li>
          <li>{t("Transparent reporting and analytics")}</li>
          <li>{t("Flexible budgets - start from ₹5,000/day")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Get Started")}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Contact our advertising team at advertising@chrona.com or call +91 1800-123-4567 (option 3).")}
        </p>
      </div>
    </div>
  );
}