"use client";

import { use } from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const helpContent: Record<string, { title: string; content: string }> = {
  payment: {
    title: "Payment Help",
    content: "We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery. If you're having issues with payment, please contact support.",
  },
  shipping: {
    title: "Shipping Help",
    content: "We offer free shipping on all orders. Standard delivery takes 3-7 business days. You can track your order from your account page.",
  },
  returns: {
    title: "Returns & Cancellations",
    content: "You can return items within 30 days of delivery. Returns are free for most items. To start a return, go to your orders page and click 'Return'.",
  },
  faq: {
    title: "FAQ",
    content: "Frequently asked questions about orders, payments, shipping, and returns. If you don't find your answer here, please contact our support team.",
  },
};

export default function HelpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t } = useTranslation();
  const help = helpContent[slug] || { title: "Help", content: "Help content coming soon." };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t(help.title)}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">{t(help.content)}</p>
      </div>
    </div>
  );
}