import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size: number;
  variant: 'light-bg' | 'dark-bg';
}

export default function Logo({ size = 32, variant }: LogoProps) {
  const src = variant === "light-bg" ? "/chrona-red.svg" : "/chrona-white.svg";

  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image 
        src={src}
        alt="Chrona Logo" 
        width={290} 
        height={64} 
        className="object-contain"
        priority
        style={{
          width: `${size}px`,
          height: "auto",
        }}
      />
    </Link>
  );
}
