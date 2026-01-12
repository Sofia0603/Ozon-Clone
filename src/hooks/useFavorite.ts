import { favoritesProductIdAtom } from '@/store'
import { useAtom } from 'jotai'
import { TProductWithReviews } from '@/lib/db/types'

export function useFavorite({product}:{product: TProductWithReviews}) {
  const [favoritesProductId, setFavoritesProductId] = useAtom(favoritesProductIdAtom);

  const isFavorite = favoritesProductId.includes(product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavoritesProductId((ids) => ids.filter((id) => id !== product.id));
    } else {
      setFavoritesProductId((ids) => [...ids, product.id]);
    }
  };

	return {
		isFavorite,
		toggleFavorite
	}
}
