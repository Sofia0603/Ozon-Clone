import { TProductWithReviews } from '@/lib/db/types';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  product: TProductWithReviews;
  discountPrecent?: number | null;
}

export function ProductDetailsGallery({ product, discountPrecent }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col gap-2 h-[680px] overflow-y-auto ">
        {product.images.map((img, index) => (
          <button
            className={cn(
              'rounded-lg p-1 border-2 border-transparent',
              {'border-primary' : index === activeImageIndex}
            )}
            key={index}
            onClick={() => setActiveImageIndex(index)}
          >
            <Image
              src={img}
              alt={product.name}
              width={70}
              height={70}
              className="object-cover rounded-lg"
              draggable={false}
            />
          </button>
        ))}
      </div>
      <div className="relative w-max">
        <Image
          src={product.images[activeImageIndex]}
          alt={product.name}
          width={540}
          height={526}
          className="object-cover rounded-2xl fadeIn"
          draggable={false}
        />
        {discountPrecent && discountPrecent > 50 && (
          <div
            className="rounded-lg bg-white absolute right-5 top-5 flex items-center 
          		gap-1.5 text-sm font-medium px-4 text-green-500 py-1"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Вау-цены</span>
          </div>
        )}
      </div>
    </div>
  );
}
