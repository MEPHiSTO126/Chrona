"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function FAQPage() {
  const { t } = useTranslation();

  const faqs = [
    {
      q: "How do I track my order?",
      a: "Once your order ships, you'll receive an SMS and email with a tracking link. You can also track from your account page under 'My Orders'.",
    },
    {
      q: "Can I change my delivery address after placing an order?",
      a: "You can update the address before the order ships. Go to your Orders page and click 'Change Address' if available. Once shipped, contact support immediately.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept UPI (PhonePe, Paytm, Google Pay), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking, and Cash on Delivery.",
    },
    {
      q: "How long does delivery take?",
      a: "Standard delivery takes 3-7 business days. Express delivery (1-2 days) is available in select locations. All orders ship free.",
    },
    {
      q: "How do I return an item?",
      a: "Go to your Orders page, select the item, choose 'Return', and follow the steps. You can schedule a pickup or drop off at a partner location.",
    },
    {
      q: "When will I get my refund?",
      a: "Refunds are processed to the original payment method within 5-10 business days after we receive and inspect the returned item.",
    },
    {
      q: "Do you ship internationally?",
      a: "Currently, we only ship within India. International shipping is planned for the future.",
    },
    {
      q: "How do I contact customer support?",
      a: "Email us at support@chrona.com or call +91 1800-123-4567. Support hours: Mon-Sat, 9am-8pm IST.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Frequently Asked Questions")}</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-white border border-gray-200 rounded-xl p-5 group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
              {t(faq.q)}
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="text-gray-600 mt-3 leading-relaxed">{t(faq.a)}</p>
          </details>
        ))}
      </div>
    </div>
  );
}