'use client';

import { ProductItem } from '@/components/elements/product-item/ProductItem';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { getProductsByIds } from '@/lib/actions/getAllProductIds'
import { favoritesProductIdAtom } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

export function Favorites() {


  const favoritesProductId = useAtomValue(favoritesProductIdAtom);
	
  const { data , isPending } = useQuery({
    queryKey: ['favorites', favoritesProductId],
    queryFn: () => getProductsByIds(favoritesProductId),
    enabled: favoritesProductId.length > 0,
  });

  return (
    <div className="mt-10">
      <h1 className="font-bold text-4xl">Favorites</h1>

      <div className="mt-5">
        {favoritesProductId.length ? ( 
					<div className='grid grid-cols-5 gap-5'>
					{isPending ? (
          <SkeletonLoader count={favoritesProductId.length} className='h-[503px] rounded-lg' />
        ) : (
					data?.length && 
          data.map(product => (
						 <ProductItem
						  key={product.id}
							product={product}
						 />
						)) 
					)}
					</div>
				) : (
				<div>No favorite products found.</div>
			)}
      </div>
    </div>
  );
}
