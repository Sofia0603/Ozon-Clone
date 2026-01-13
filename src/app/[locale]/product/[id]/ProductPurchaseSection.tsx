import { Button } from '@/components/ui/Button'
import { useFavorite } from '@/hooks/useFavorite'
import { TProductWithReviews } from '@/lib/db/types'
import { addCurrency } from '@/utils/add-currency'
import { cn } from '@/utils/cn'
import { Heart } from 'lucide-react'

interface Props {
	product: TProductWithReviews,
	discountPrecent : number
}

export function ProductPurchaseSection({ product, discountPrecent }: Props) {

  const { isFavorite, toggleFavorite } = useFavorite({ product });


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
              <span className="text-pink-600 font-bol d text-sm">-{discountPrecent}%</span>
            )}
          </div>
          <div className="flex gap-4">
            <Button>Добавить в корзину</Button>

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
