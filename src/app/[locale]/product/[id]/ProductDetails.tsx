'use client';

import { Button } from '@/components/ui/Button';
import { useFavorite } from '@/hooks/useFavorite';
import { TProductWithReviews } from '@/lib/db/types';
import { useProductDetail } from '@/useProductDetail';
import { addCurrency } from '@/utils/add-currency';
import { cn } from '@/utils/cn';
import { declensionWord } from '@/utils/declension-word';
import { Heart, MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react'

interface Props {
  product: TProductWithReviews;
}

export function ProductDetails({ product }: Props) {
  const { isFavorite, toggleFavorite } = useFavorite({ product });

  const { reviewCount, reviewAverage, discountPrecent } = useProductDetail({ product });

	const [activeImageIndex, setActiveImageIndex] = useState()

  return (
    <div className="mt-6 grid grid-cols-[2fr_1.5fr_1.2fr] gap-10">
      <div className='flex items-start gap-2'>
        <div className='flex flex-col gap-5'>
         <button className='rounded-lg p-1 border-2 border-primary'>
					 <Image
            src={product.imageUrl}
            alt={product.name}
            width={70}
            height={70}
            className="object-cove"
            draggable={false}
          />
				 </button>
         <button className={cn('rounded-lg p-1', {
					activeImageIndex : 'border-2 border-primary'
				 })}>
					 <Image
            src={product.imageUrl}
            alt={product.name}
            width={70}
            height={70}
            className="object-cove"
            draggable={false}
          />
				 </button>
        </div>
        <div className="relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={540}
            height={526}
            className="object-cover rounded-2xl"
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
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-amber-400 stroke-amber-400" />
            <span className="font-semibold text-neutral-400">{reviewAverage}</span>
          </div>

          <div className="flex items-center gap-1">
            <MessageCircle size={16} className="fill-neutral-400 stroke-neutral-400" />
            <span className="font-semibold text-neutral-400">
              {reviewCount} {declensionWord(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <h2 className="font-bold text-xl mb-1">О товаре</h2>
          <article className="text-sm">{product.description}</article>
        </div>
      </div>
      <div>
        <div className="mt-8">
          <div className="bg-white shadow-lg p-6 rounded-2xl">
            <div className="mb-5 flex items-center">
              <span
                className={cn('text-3xl font-semibold', {
                  'text-green-500': product.discountPrice,
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
            <div className="flex gap-4">
              <Button>Добавить в корзину</Button>

              <button onClick={toggleFavorite}>
                <Heart
                  fill={isFavorite ? 'var(--color-primary)' : 'white'}
                  stroke="var(--color-primary)"
                  className="transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
