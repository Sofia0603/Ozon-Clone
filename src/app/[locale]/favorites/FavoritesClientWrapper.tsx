'use client'

import dynamic from 'next/dynamic'

const DynamicFavorites = dynamic(() => import('./Favorites').then((mod) => mod.Favorites), {
  ssr: false,
});

export function FavoritesClientWrapper(){
	return <DynamicFavorites />
}