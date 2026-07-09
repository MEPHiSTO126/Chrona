"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function SupportPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Support Center")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Welcome to the Chrona Support Center. Find answers to common questions or contact our support team for personalized assistance.")}
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{t("Quick Links:")}</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><Link href="/help/returns" className="text-primary hover:underline">{t("Returns & Cancellations")}</Link></li>
            <li><Link href="/help/shipping" className="text-primary hover:underline">{t("Shipping Information")}</Link></li>
            <li><Link href="/help/payment" className="text-primary hover:underline">{t("Payment Help")}</Link></li>
            <li><Link href="/faq" className="text-primary hover:underline">{t("Frequently Asked Questions")}</Link></li>
          </ul>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{t("Contact Support:")}</h3>
          <p className="text-gray-600 mb-2">{t("Email: support@chrona.com")}</p>
          <p className="text-gray-600 mb-2">{t("Phone: 1-800-CHRONA (1-800-247-662)")}</p>
          <p className="text-gray-600">{t("Hours: Mon-Fri 9AM-6PM IST")}</p>
        </div>
      </div>
    </div>
  );
}