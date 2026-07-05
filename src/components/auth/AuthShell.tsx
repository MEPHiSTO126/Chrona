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
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0c1a2e]">

      {/* ── Animated floating orbs ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Card ───────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-sm mx-4 my-8">
        {/* Glow border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-orange-400 to-primary rounded-2xl opacity-30 blur-sm animate-pulse" />

        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-7 sm:p-9 shadow-2xl">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <Logo size={90} variant="dark-bg" />
          </div>

          {/* Headings */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{title}</h1>
            <p className="text-sm text-white/60 font-medium">{desc}</p>
          </div>

          {/* Form slot */}
          <div>{children}</div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Footer link */}
          <p className="text-sm text-center text-white/50">
            {footer}{" "}
            <Link href={linkSrc} className="text-primary font-bold hover:text-orange-400 transition-colors underline underline-offset-2">
              {link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
