"use client";

import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("About Us")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Chrona is your premium destination for fashion, electronics, cosmetics, groceries and more. We believe in shopping smart and living better.")}
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Founded with a vision to bring quality products at competitive prices, we've grown to serve thousands of happy customers across the region.")}
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Our mission is to provide a seamless shopping experience with fast delivery, easy returns, and exceptional customer service.")}
        </p>
      </div>
    </div>
  );
}