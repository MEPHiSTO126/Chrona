"use client";

import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Contact Us")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("We'd love to hear from you! Reach out to our support team:")}
        </p>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">{t("Email")}</h3>
            <p className="text-gray-600">support@chrona.com</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">{t("Phone")}</h3>
            <p className="text-gray-600">+91 1800-123-4567</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">{t("Hours")}</h3>
            <p className="text-gray-600">Mon-Sat: 9am - 8pm IST</p>
          </div>
        </div>
      </div>
    </div>
  );
}