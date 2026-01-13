import { TProductWithReviews } from '@/lib/db/types'
import { declensionWord } from '@/utils/declension-word'
import { MessageCircle, Star } from 'lucide-react'

interface Props {
	product: TProductWithReviews,
	reviewAverage: number | string
	reviewCount: number 
}

export function ProductInformation({product, reviewAverage, reviewCount }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-amber-400 stroke-amber-400" />
          <span className="font-semibold text-neutral-400">{reviewAverage}</span>
        </div>

        <div className="flex items-center gap-1">
          <MessageCircle size={16} className="fill-neutral-400 stroke-neutral-400" />
          <span className="font-semibold text-neutral-400">
            {reviewCount} {declensionWord(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </span>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="font-bold text-xl mb-1">О товаре</h2>
        <article className="text-sm">{product.description}</article>
      </div>
    </div>
  );
}
