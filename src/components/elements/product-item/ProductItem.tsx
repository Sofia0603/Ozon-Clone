'use client';

import { TProductWithReviews } from '@/lib/db/types';
import { addCurrency } from '@/utils/add-currency';
import { cn } from '@/utils/cn';
import { declensionWord } from '@/utils/declension-word';
import { Heart, MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PagesConfig } from '@/config/config.pages';
import { useProductDetail } from '@/useProductDetail';
import { useFavorite } from '@/hooks/useFavorite';

interface Props {
  product: TProductWithReviews;
}

export function ProductItem({ product }: Props) {
  const { isFavorite, toggleFavorite } = useFavorite({ product });

  const { reviewCount, reviewAverage, discountPrecent } = useProductDetail({ product });

  return (
    <div>
      <div className="relative">
        <Link href={PagesConfig.PRODUCT_DETAILS(product.id)}>
          <Image
            width={280}
            height={373}
            alt={product.name}
            src={product.imageUrl}
            draggable={false}
            className="object-cover h-93.25 rounded-2xl"
          />
        </Link>

        <button className="absolute top-2 right-2" onClick={toggleFavorite}>
          <Heart
            fill={isFavorite ? 'red' : 'white'}
            stroke={isFavorite ? 'red' : 'black'}
            className="transition-colors"
          />
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

      <div className="leading-snug">
        <Link href={PagesConfig.PRODUCT_DETAILS(product.id)}>{product.name}</Link>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-amber-400 stroke-amber-400" />
          <span className="font-semibold text-sm">{reviewAverage}</span>
        </div>

        <div className="flex items-center gap-1">
          <MessageCircle size={16} className="fill-neutral-400 stroke-neutral-400" />
          <span className="font-semibold text-sm text-neutral-400">
            {reviewCount} {declensionWord(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </span>
        </div>
      </div>
    </div>
  );
}
