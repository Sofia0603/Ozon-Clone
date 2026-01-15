import { useMemo } from 'react';
import { TProductWithReviews } from './lib/db/types';
import { useProductDiscount } from './useProductDiscount';

export function useProductDetail({
  product,
}: {
  product: TProductWithReviews;
}) {
  const reviews = product.reviews ?? [];

  const { discountPrecent } = useProductDiscount({
    price: product.price,
    discountPrice: product.discountPrice,
  });

  const reviewAverage = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((acc, review) => acc + review.rating, 0);

    return Math.round(total / reviews.length).toFixed(1);
  }, [reviews]);

  const reviewCount = useMemo(() => {
    const min = 1000;
    const max = 50000;
    const hash = String(product.id)
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const randomNumber = min + (hash % (max - min + 1));

    return randomNumber + reviews.length;
  }, [reviews, product.id]);

  return { reviewCount, reviewAverage, discountPrecent };
}
