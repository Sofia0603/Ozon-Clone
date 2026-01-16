'use client';

import { ProductQuantity } from '@/components/elements/product-quantity/ProductQuantity';
import { useChangeQuantity } from '@/components/elements/product-quantity/useChangeQuantity';
import { useFavorite } from '@/hooks/useFavorite';
import { useProductDiscount } from '@/hooks/useProductDiscount';
import { updateCartItemQuantity } from '@/lib/actions/cart';
import { TCartItem } from '@/lib/db/types';
import { addCurrency } from '@/utils/add-currency';
import { cn } from '@/utils/cn';
import { CreditCardIcon, Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface Props {
  cartItem: TCartItem;
}

export function CartItem({ cartItem }: Props) {
  const { discountPrecent } = useProductDiscount({
    price: cartItem.product.price,
    discountPrice: cartItem.product.discountPrice,
  });

  const { isFavorite, toggleFavorite } = useFavorite({
    product: cartItem.product,
  });

  const { isPendingQuantity, updateQuantityInCart } = useChangeQuantity({
    product: cartItem.product,
    quantityInCart: cartItem.quantity,
  });

  return (
    <div className="grid grid-cols-[4fr_1fr_1fr] bg-white rounded-2xl p-5">
      <div className="flex gap-4 items-start">
        <Image
          src={cartItem.product.images[0]}
          alt={cartItem.product.name}
          width={100}
          height={133}
          className="rounded-2xl shrink-0 h-33.25 object-cover"
        />

        <div>
          <h2 className="text-lg leading-snug mb-2">{cartItem.product.name}</h2>

          {discountPrecent && discountPrecent > 50 && (
            <div
              className="rounded-lg bg-black/85 flex items-center 
          gap-1.5 text-sm font-medium px-3 text-white"
            >
              <div className="w-2 h-2 bg-red-700 rounded-full"></div>
              <span>Вау-цены</span>
            </div>
          )}

          <div className='flex items-center gap-4 mt-4'>
            <button onClick={toggleFavorite}>
              <Heart
                fill={isFavorite ? 'var(--color-secondary)' : 'black'}
                stroke={isFavorite ? 'var(--color-secondary)' : 'black'}
                className="transition-colors"
              />
            </button>
            <button
              onClick={() => {
                updateCartItemQuantity(cartItem.product.id, 0);
              }}
            >
              <Trash2 color="black" />
            </button>
          </div>
        </div>
      </div>

      <div className='ml-2'>
        <div className='flex items-center gap-2'>
          <span
            className={cn('text-lg font-semibold', {
              'text-secondary': cartItem.product.discountPrice,
            })}
          >
            {addCurrency(cartItem.product.discountPrice ?? cartItem.product.price)}
          </span>
          <CreditCardIcon size={20} className={cn(cartItem.product.discountPrice && "text-secondary",)}/>
        </div>
        {cartItem.product.discountPrice && (
          <span className="line-through opacity-50 font-bold text-sm">
            {addCurrency(cartItem.product.price)}
          </span>
        )}
      </div>

      <div className='flex justify-end items-start'>
        <ProductQuantity
          updateQuantityInCart={updateQuantityInCart}
          isPendingQuantity={isPendingQuantity}
          quantityInCart={cartItem.quantity}
          colors={[
            'bg-neutral-50',
            'hover: bg-neutral-200/70',
            'text-neutral-900',
          ]}
        />
      </div>
    </div>
  );
}
