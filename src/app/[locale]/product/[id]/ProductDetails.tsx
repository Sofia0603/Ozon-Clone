'use client';

import { useProductDetail } from '@/components/elements/product-item/useProductDetail';
import { TProductWithReviews } from '@/lib/db/types';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductDetailsGallery } from './ProductDetailsGallery';
import { ProductInformation } from './ProductInformation';
import { ProductPurchaseSection } from './ProductPurchaseSection';

interface Props {
  product: TProductWithReviews;
}

export function ProductDetails({ product }: Props) {
  const { reviewCount, reviewAverage,   discountPrecent } = useProductDetail({
    product,
  });

  return (
    <div className="mt-6">
      <Breadcrumbs />
      <div className="mt-2 grid grid-cols-[2fr_1.5fr_1.2fr] gap-10">
        <ProductDetailsGallery
          product={product}
          discountPrecent={discountPrecent}
        />
        <ProductInformation
          product={product}
          reviewAverage={reviewAverage}
          reviewCount={reviewCount}
        />
        <ProductPurchaseSection
          product={product}
          discountPrecent={discountPrecent}
        />
      </div>
    </div>
  );
}
