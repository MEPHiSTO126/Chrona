"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function PaymentHelpPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/support" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Support")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Payment Help")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Having trouble with your payment? Here are answers to common payment-related questions.")}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Accepted Payment Methods")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>UPI (PhonePe, Paytm, Google Pay, etc.)</li>
          <li>Credit & Debit Cards (Visa, Mastercard, RuPay, American Express)</li>
          <li>Net Banking (All major banks)</li>
          <li>Cash on Delivery (COD)</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Common Issues")}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li><strong>{t("Payment failed:")}</strong> {t("Check your internet connection and try again. Ensure sufficient funds/balance.")}</li>
          <li><strong>{t("Amount deducted but order not placed:")}</strong> {t("The amount will be auto-refunded within 5-7 business days. Contact support if not refunded.")}</li>
          <li><strong>{t("UPI payment not going through:")}</strong> {t("Try a different UPI app or check your daily transaction limit.")}</li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{t("Refunds")}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Refunds are processed to the original payment method within 5-10 business days after we receive the returned item.")}
        </p>
      </div>
    </div>
  );
}