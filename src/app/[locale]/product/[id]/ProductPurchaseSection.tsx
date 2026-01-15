import { Button } from '@/components/ui/Button';
import { PagesConfig } from '@/config/config.pages';
import { useFavorite } from '@/hooks/useFavorite';
import { addToCart, updateCartItemQuantity } from '@/lib/actions/cart';
import { TProductWithReviews } from '@/lib/db/types';
import { addCurrency } from '@/utils/add-currency';
import { cn } from '@/utils/cn';
import { Heart, Minus, Plus } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';
import { ProductQuantity } from '@/components/elements/product-quantity/ProductQuantity';
import { useChangeQuantity } from '@/components/elements/product-quantity/useChangeQuantity'

interface Props {
  product: TProductWithReviews;
  discountPrecent: number;
  quantityInCart: number;
}

export function ProductPurchaseSection({
  product,
  discountPrecent,
  quantityInCart,
}: Props) {
  const { isFavorite, toggleFavorite } = useFavorite({ product });
  const [isPending, startTransition] = useTransition();

  const purchaseProduct = () => {
    startTransition(async () => {
      const result = await addToCart(product.id);

      if (result.success) {
        toast.success('Товар добавлен в корзину', { id: product.id });
      } else {
        toast.error('Не удалось добавить товар в корзину', {
          id: product.id,
        });
      }
    });
  };

  const {isPendingQuantity, updateQuantityInCart} = useChangeQuantity({
    product,
    quantityInCart
  })

  const router = useRouter();

  return (
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
              <span className="text-pink-600 font-bol d text-sm">
                -{discountPrecent}%
              </span>
            )}
          </div>
          <div className="flex gap-4">
            {quantityInCart > 0 ? (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    router.push(PagesConfig.CART);
                  }}
                  className="flex flex-col leading-none"
                  variant="green"
                >
                  <span className="font-semibold">В корзине</span>
                  <span className="text-sm font-light">перейти</span>
                </Button>
                <ProductQuantity
                  updateQuantityInCart={updateQuantityInCart}
                  isPendingQuantity={isPendingQuantity}
                  quantityInCart={quantityInCart}
                />
              </div>
            ) : (
              <Button onClick={purchaseProduct} disabled={isPending}>
                {isPending ? 'Добавление...' : ' Добавить в корзину'}
              </Button>
            )}

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
  );
}
