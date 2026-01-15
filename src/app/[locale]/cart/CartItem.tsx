'use client';

import { ProductQuantity } from '@/components/elements/product-quantity/ProductQuantity';
import { useChangeQuantity } from '@/components/elements/product-quantity/useChangeQuantity';
import { useFavorite } from '@/hooks/useFavorite';
import { useProductDetail } from '@/hooks/useProductDetail';
import { updateCartItemQuantity } from '@/lib/actions/cart';
import { TCartItem } from '@/lib/db/types';
import { addCurrency } from '@/utils/add-currency';
import { cn } from '@/utils/cn';
import { CreditCardIcon, Heart, Trash2 } from 'lucide-react';
import { Image } from 'next/image';

interface Props {
  cartItem: TCartItem;
}

export function CartItem({ cartItem }: Props) {
  const { discountPrecent } = useProductDetail({
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
    <div className="flex items-start justify-between">
      <div className="flex gap-3 items-center">
        <Image
          src={cartItem.product.images[0]}
          alt={cartItem.product.name}
          w={100}
          height={100}
          className="rounded shrink-0"
        />

        <div>
          <h2 className="font-medium text-lg">{cartItem.product.name}</h2>

          {discountPrecent && discountPrecent > 50 && (
            <div
              className="rounded-lg bg-black flex items-center 
          gap-1.5 text-sm font-medium px-3 text-white"
            >
              <div className="w-2 h-2 bg-red-700 rounded-full"></div>
              <span>Вау-цены</span>
            </div>
          )}

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

      <div>
        <div>
          <span
            className={cn('text-3xl font-semibold', {
              'text-secondary': cartItem.product.discountPrice,
            })}
          >
            {addCurrency(cartItem.product.price)}
          </span>
					<CreditCardIcon className='text-secondary' />
        </div>
        {cartItem.product.discountPrice && (
          <span className="line-through italic opacity-50 font-bold text-sm">
            {addCurrency(cartItem.product.discountPrice)}
          </span>
        )}
      </div>

      <div>
        <ProductQuantity
          updateQuantityInCart={updateQuantityInCart}
          isPendingQuantity={isPendingQuantity}
          quantityInCart={cartItem.quantity}
          colors={[
            'bg-neutral-100/50',
            'hover: bg-neutral-200/70',
            'text-neutral-900',
          ]}
        />
      </div>
    </div>
  );
}
