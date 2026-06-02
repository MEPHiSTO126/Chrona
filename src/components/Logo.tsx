import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image 
        src="/logo.png" 
        alt="Chrona Logo" 
        width={97} 
        height={60} 
        className="object-contain"
        priority
      />
    </Link>
  );
}
