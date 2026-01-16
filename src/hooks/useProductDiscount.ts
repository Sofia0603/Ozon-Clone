import { useMemo } from 'react';

interface Props {
  discountPrice?: number | null;
  price: number;
}

export function useProductDiscount({ discountPrice, price }: Props) {
  const discountPrecent = useMemo(() => {
    if (!discountPrice) {
      return null;
    }
    return Math.round(((price - discountPrice) / price) * 100);
  }, [price, discountPrice]);
  return { discountPrecent };
}
