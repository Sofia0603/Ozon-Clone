import { TProductWithReviews } from '@/lib/db/types';
import Image from 'next/image'
import { product } from '@/lib/db/schema';

interface Props {
  product: TProductWithReviews;
}

export function ProductDetails({product}: Props) {
  return (
    <div className='mt-6 grid grid-cols-[2fr_1.5fr_1.5fr] gap-4'>
			<div>
				<Image
				src={product.imageUrl}
				alt={product.name}
				/>
			</div>
      <h1 className='text-2xl font-bold mb-2'>{product.name}</h1>
    </div>
  );
}
