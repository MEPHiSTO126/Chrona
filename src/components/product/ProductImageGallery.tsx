'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex gap-4 w-full">
      {/* Thumbnails on the left */}
      <div className="flex flex-col gap-3 w-20 shrink-0">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            className={`relative aspect-square w-full rounded-lg border-2 overflow-hidden bg-gray-50 transition-all ${
              activeIndex === index
                ? 'border-primary shadow-sm scale-95'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>

      {/* Main Image in the center */}
      <div className="relative flex-1 aspect-square bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center p-6 group">
        <Image
          src={images[activeIndex]}
          alt="Product preview"
          fill
          priority
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
