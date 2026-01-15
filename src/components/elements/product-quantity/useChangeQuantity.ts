import { updateCartItemQuantity } from '@/lib/actions/cart';
import { useTransition } from 'react';
import { product } from './../../../lib/db/schema';

export function useChangeQuantity({
  product,
  quantityInCart,
}: {
  product: {
    id: string;
  };
  quantityInCart: number;
}) {
  const [isPendingQuantity, startTransitionQuantity] = useTransition();

  const updateQuantityInCart = (type: 'increment' | 'decrement') => {
    startTransitionQuantity(async () => {
      await updateCartItemQuantity(
        product.id,
        type === 'increment' ? quantityInCart + 1 : quantityInCart - 1
      );
    });
  };

  return {
    isPendingQuantity,
    updateQuantityInCart,
  };
}
