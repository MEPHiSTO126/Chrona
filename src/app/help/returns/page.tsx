"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function ReturnsHelpPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/support" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Support")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Returns & Cancellations")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Our return and cancellation policy is designed to be hassle-free.")}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Return Policy")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("30-day return window from delivery date")}</li>
          <li>{t("Items must be unused, in original packaging with all tags")}</li>
          <li>{t("Free returns for most items")}</li>
          <li>{t("Refund to original payment method within 5-10 business days")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Non-Returnable Items")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("Cosmetics and personal care (hygiene reasons)")}</li>
          <li>{t("Groceries and perishables")}</li>
          <li>{t("Customized or personalized items")}</li>
          <li>{t("Final sale items (marked as non-returnable)")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("How to Start a Return")}</h3>
        <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
          <li>{t("Go to your Orders page")}</li>
          <li>{t("Select the item you want to return")}</li>
          <li>{t("Choose return reason and submit")}</li>
          <li>{t("Schedule pickup or drop off at partner location")}</li>
        </ol>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Order Cancellation")}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("You can cancel your order before it ships from the Orders page. Once shipped, you'll need to initiate a return after receiving the item.")}
        </p>
      </div>
    </div>
  );
}