import { TProduct } from '@/lib/db/types';
import { addCurrency } from '@/utils/add-currency';
import { Dot, Heart, MessageCircle, StarsIcon } from 'lucide-react';
import  Image  from 'next/image';
import { useMemo } from 'react';

interface Props {
  product: TProduct;
  reviewAverage?: number;
  reviewCount?: number;
}

export function ProductItem({ product, reviewAverage, reviewCount }: Props) {
  const discountPrecent = useMemo(() => {
    if (!product.discountPrice) {
      return null;
    }
    return Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }, [product.price, product.discountPrice]);

  return (
    <div>
      <div className="relative">
        <Image
          width={280}
          height={180}
          alt={product.name}
          src={product.imageUrl}
          draggable={false}
        />

        <button className="absolute top-2 right-2">
          <Heart fill="white" />
        </button>

        {discountPrecent && discountPrecent > 50 && (
          <div className="rounded-lg bg-black absolute left-2 bottom-2 flex items-center gap-1 px-2">
            <Dot size={30} className="stroke-pink-700" />
            <span>Вау-цены</span>
          </div>
        )}
      </div>

      <div className="">
        <span> {addCurrency(product.price)}</span>
        {product.discountPrice && <span> {addCurrency(product.discountPrice)}</span>}

        {discountPrecent && <span>-{discountPrecent}%</span>}
      </div>

      <div>{product.name}</div>

      <div className='flex items-center gap-3'>
        <div>
          <StarsIcon className="fill-amber-400" />
          <span>{reviewAverage}</span>
        </div>

        <div>
          <MessageCircle className="fill-stone-600" />
          <span>{reviewCount}</span>
        </div>
      </div>
    </div>
  );
}
