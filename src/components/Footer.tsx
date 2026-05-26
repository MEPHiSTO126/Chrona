import Link from 'next/link';
import Image from 'next/image';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.32 3.91A12.16 12.16 0 013.15 4.83a4.28 4.28 0 001.33 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0024 5.06a8.58 8.58 0 01-2.54.7z"/></svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg>
);
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 .3a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.33-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.56 2.56 0 01.76-1.61c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 011.24-3.22 4.3 4.3 0 01.12-3.18s1-.32 3.3 1.23a11.4 11.4 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.24 3.22c0 4.61-2.8 5.63-5.48 5.92a2.87 2.87 0 01.82 2.23v3.29c0 .32.21.7.82.58A12 12 0 0012 .3z"/></svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
);

const ABOUT_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

const HELP_LINKS = [
  { label: 'Payment', href: '/help/payment' },
  { label: 'Shipping', href: '/help/shipping' },
  { label: 'Return & Order Cancellations', href: '/help/returns' },
  { label: 'FAQ', href: '/faq' },
];

const POLICY_LINKS = [
  { label: 'Privacy', href: '/policies/privacy' },
  { label: 'Security', href: '/policies/security' },
  { label: 'Terms & Conditions', href: '/policies/terms' },
  { label: 'Seller', href: '/policies/seller' },
  { label: 'Return & Refund', href: '/policies/refund' },
  { label: 'Shipping', href: '/policies/shipping' },
];

const QUICK_LINKS = [
  { label: 'Privacy Policy', href: '/policies/privacy' },
  { label: 'Terms Of Use', href: '/policies/terms' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const SOCIAL_ICONS = [
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  { icon: GithubIcon, href: 'https://github.com/MEPHiSTO126/Chrona', label: 'GitHub' },
  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-gray-400 text-xs hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0F1111] text-gray-300 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <Image src="/logo-dark.png" alt="Chrona" width={122} height={75} className="object-contain" />
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-5">
              Your premium destination for fashion, electronics, cosmetics, groceries and more. Shop smart, live better.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <FooterColumn title="About" links={ABOUT_LINKS} />
          <FooterColumn title="Help" links={HELP_LINKS} />
          <FooterColumn title="Policies" links={POLICY_LINKS} />
          <FooterColumn title="Quick Link" links={QUICK_LINKS} />

          {/* Download App Column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Download App</h3>
            <p className="text-gray-400 text-xs mb-3">Save $3 with App New User Only</p>
            <div className="flex flex-col gap-2 mb-4">
              <a href="#" className="block hover:opacity-80 transition-opacity">
                <Image src="/google-play-badge.svg" alt="Get it on Google Play" width={140} height={42} className="rounded" />
              </a>
              <a href="#" className="block hover:opacity-80 transition-opacity">
                <Image src="/app-store-badge.svg" alt="Download on the App Store" width={140} height={42} className="rounded" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>©2026 dheos.com</span>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link href="/seller-registration" className="hover:text-white transition-colors">Seller Registration</Link>
            <Link href="/advertise" className="hover:text-white transition-colors">Advertise with us</Link>
            <Link href="/affiliate" className="hover:text-white transition-colors">Become an Affiliate</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support Center</Link>
            <span className="font-bold text-white text-base tracking-wider">VISA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
