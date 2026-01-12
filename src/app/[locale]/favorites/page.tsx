
import { Metadata } from 'next';
import { FavoritesClientWrapper } from './FavoritesClientWrapper'


export const metadata: Metadata = {
  title: 'Favorites',
};

export default function Page() {
  return <FavoritesClientWrapper />;
}
