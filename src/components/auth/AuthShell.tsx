"use client";

import Link from "next/link";
import Logo from "../Logo";

interface AuthShellProps {
  title: string;
  desc: string;
  children: React.ReactNode;
  footer: string;
  linkSrc: string;
  link: string;
  /** imgSrc is kept in props for backward compat but not used in new design */
  imgSrc?: string;
}

export const AuthShell = ({ title, desc, children, footer, linkSrc, link }: AuthShellProps) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo size={108} variant="light-bg" />
          </div>

          {/* Headings */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 font-syne mb-1.5">{title}</h1>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>

          {/* Form slot */}
          <div>{children}</div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Footer link */}
          <p className="text-sm text-center text-gray-600">
            {footer}{" "}
            <Link href={linkSrc} className="text-primary font-semibold hover:text-primary-dark transition-colors underline underline-offset-2">
              {link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
