import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { name: 'Man', href: '/category/man' },
  { name: 'Woman', href: '/category/woman' },
  { name: 'Electronic', href: '/category/electronic' },
  { name: 'Cosmetics', href: '/category/cosmetics' },
  { name: 'Grocery', href: '/category/grocery' },
];

export default function CategoryNav() {
  return (
    <nav className="w-full bg-background border-b border-gray-200 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center gap-10 py-3">
          {CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <Link 
                href={cat.href} 
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors group"
              >
                {cat.name}
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
