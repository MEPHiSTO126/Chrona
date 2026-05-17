import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-0.5 shrink-0">
      <span 
        className="text-2xl font-extrabold tracking-tighter text-white"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        chrona
      </span>
      <Image 
        src="/logo.png" 
        alt="Chrona Logo" 
        width={36} 
        height={36} 
        className="object-contain"
        priority
      />
    </Link>
  );
}
