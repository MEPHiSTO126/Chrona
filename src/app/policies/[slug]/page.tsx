"use client";

import { use } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

const policies: Record<string, { title: string; content: string }> = {
  privacy: {
    title: "Privacy Policy",
    content: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our services. We collect information you provide directly to us, such as when you create an account, place an order, or contact support. We use this information to provide, maintain, and improve our services.",
  },
  security: {
    title: "Security Policy",
    content: "We take the security of your data seriously. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using industry-standard SSL/TLS protocols.",
  },
  terms: {
    title: "Terms & Conditions",
    content: "By using Chrona, you agree to these terms and conditions. Please read them carefully. We reserve the right to modify these terms at any time. Your continued use of the service after changes constitutes acceptance of the new terms.",
  },
  seller: {
    title: "Seller Policy",
    content: "This policy outlines the terms for sellers on our platform. Sellers must comply with all applicable laws and our platform policies. We reserve the right to suspend or terminate seller accounts that violate our policies.",
  },
  refund: {
    title: "Return & Refund Policy",
    content: "We offer a 30-day return policy on most items. Items must be in their original condition with all packaging. Refunds are processed to the original payment method within 5-10 business days after we receive the return. Some items like cosmetics and groceries may not be returnable for hygiene reasons.",
  },
  shipping: {
    title: "Shipping Policy",
    content: "We offer free shipping on all orders. Standard delivery takes 3-7 business days. Express delivery is available for select locations. You'll receive tracking information once your order ships. We currently ship within India only.",
  },
};

export default function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t } = useTranslation();
  const policy = policies[slug] || { title: "Policy", content: "Policy content coming soon." };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t(policy.title)}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">{t(policy.content)}</p>
        <p className="text-gray-600 leading-relaxed">
          {t("Last updated: July 2026. For questions about this policy, contact legal@chrona.com")}
        </p>
      </div>
    </div>
  );
}