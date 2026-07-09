"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function ShippingHelpPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/support" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Support")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Shipping Help")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Information about our shipping process, delivery times, and tracking.")}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Delivery Times")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("Standard Delivery: 3-7 business days")}</li>
          <li>{t("Express Delivery: 1-2 business days (select locations)")}</li>
          <li>{t("Free Shipping on all orders")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Tracking Your Order")}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Once your order ships, you'll receive an SMS and email with a tracking link. You can also track from your account page.")}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Delivery Issues")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("Not home during delivery: Our courier will attempt delivery 2-3 times before returning the package.")}</li>
          <li>{t("Wrong address: Contact support immediately to update the address before dispatch.")}</li>
          <li>{t("Damaged package: Refuse delivery and contact us within 24 hours for a replacement.")}</li>
        </ul>
      </div>
    </div>
  );
}