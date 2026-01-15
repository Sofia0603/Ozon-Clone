import { TProduct } from '@/lib/db/types'
import { favoritesProductIdAtom } from '@/store'
import { useAtom } from 'jotai'

export function useFavorite({product}:{product: TProduct}) {
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
