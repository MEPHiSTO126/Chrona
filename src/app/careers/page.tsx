"use client";

import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function CareersPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
      <Link href="/" className="text-primary hover:underline text-sm mb-6 block">
        ← {t("Back to Home")}
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("Careers")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Join our team and help shape the future of e-commerce. We're always looking for talented individuals who are passionate about technology, customer experience, and innovation.")}
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          {t("Current openings:")}
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
          <li>{t("Software Engineer - Frontend")}</li>
          <li>{t("Software Engineer - Backend")}</li>
          <li>{t("Product Manager")}</li>
          <li>{t("UX Designer")}</li>
          <li>{t("Customer Support Specialist")}</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          {t("Send your resume to careers@chrona.com")}
        </p>
      </div>
    </div>
  );
}