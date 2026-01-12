import { useMemo } from 'react';
import { TProductWithReviews } from './lib/db/types';

export function useProductDetail({ product }: { product: TProductWithReviews }) {
  const reviews = product.reviews ?? [];

  const discountPrecent = useMemo(() => {
    if (!product.discountPrice) {
      return null;
    }
    return Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }, [product.price, product.discountPrice]);

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
