import { TProduct, TProductWithReviews } from '@/lib/db/types';
import { addCurrency } from '@/utils/add-currency';
import { cn } from '@/utils/cn';
import { Heart, MessageCircle, Star, StarsIcon } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

interface Props {
  product: TProductWithReviews;
}

export function ProductItem({ product }: Props) {
  const discountPrecent = useMemo(() => {
    if (!product.discountPrice) {
      return null;
    }
    return Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }, [product.price, product.discountPrice]);

  const reviewAverage = useMemo(() => {
    if (product.reviews.length === 0) {
      return 0;
    }

    const total = product.reviews.reduce((acc, review) => acc + review, rating, 0);

    return Math.round(total / product.reviews.length)
  }, [product.reviews]);

  return (
    <div>
      <div className="relative">
        <Image
          width={280}
          height={373}
          alt={product.name}
          src={product.imageUrl}
          draggable={false}
          className="object-cover h-93.25 rounded-2xl"
        />

        <button className="absolute top-2 right-2">
          <Heart fill="white" />
        </button>

        {discountPrecent && discountPrecent > 50 && (
          <div
            className="rounded-lg bg-black absolute left-2 bottom-2 flex items-center 
          gap-1.5 text-sm font-medium px-3 text-white"
          >
            <div className="w-2 h-2 bg-red-700 rounded-full"></div>
            <span>Вау-цены</span>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span
          className={cn('text-lg font-semibold', {
            'text-pink-600': product.discountPrice,
          })}
        >
          {addCurrency(product.price)}
        </span>

        {product.discountPrice && (
          <span className="line-through italic opacity-50 font-bold text-sm">
            {addCurrency(product.discountPrice)}
          </span>
        )}

        {discountPrecent && (
          <span className="text-pink-600 font-bol d text-sm">-{discountPrecent}%</span>
        )}
      </div>

      <div className="leading-snug">{product.name}</div>

      <div className="flex items-center gap-3 mt-2">
        <div>
          <Star size={16} className="fill-amber-400 stroke-amber-400" />
          <span>{reviewAverage}</span>
        </div>

        <div>
          <MessageCircle size={16} className="fill-neutral-400 stroke-neutral-400" />
          <span>{reviewCount}</span>
        </div>
      </div>
    </div>
  );
}
