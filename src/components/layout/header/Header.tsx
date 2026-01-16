'use client';

import Image from 'next/image';
import { LayoutGrid, Search, User } from 'lucide-react';
import { headerMenu } from '@/components/layout/header/header-menu.data';
import Link from 'next/link';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import { HeaderProfile } from './HeaderProfile';
import { PagesConfig } from '@/config/config.pages';
import { favoritesProductIdAtom } from '@/store';
import { useAtomValue } from 'jotai';

export function Header({ cartCount }: { cartCount?: number }) {
  const tHeader = useTranslations('header');
  const favoriteProductsIds = useAtomValue(favoritesProductIdAtom);

  console.log(favoriteProductsIds)
  const isShowFavoriteBadge = favoriteProductsIds.length > 0;
  const isShowCartBadge = cartCount !== undefined && cartCount > 0;

  return (
    <>
      <header className="grid grid-cols-[2fr_7fr_2fr] gap-5 items-center pt-3 mx-5">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image src="/ozon.png" alt="ozon" width={120} height={60} />
          </Link>
          <button className="bg-primary p-2 rounded-lg text-white flex items-center gap-2 font-medium">
            <LayoutGrid />
            <span>{tHeader('catalogTitle')}</span>
          </button>
        </div>

        <div className="rounded-xl p-1 flex items-center bg-primary">
          <input
            type="text"
            placeholder={tHeader('searchPlaceholder')}
            value=""
            onChange={() => {}}
            className="bg-white rounded-lg px-4 py-1.5 w-full"
          />
          <button className="px-6">
            <Search color="#fff" />
          </button>
        </div>

        <div className="flex gap-5 items-center ml-2 justify-end">
          <HeaderProfile />

          {headerMenu.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn('flex flex-col items-center group relative')}
            >
              <div className="relative">
                <item.icon
                  size={20}
                  className="transition-opacity group-hover:opacity-100 opacity-50"
                />

                {((item.href === PagesConfig.CART && isShowCartBadge) ||
                  (item.href === PagesConfig.FAVORITES &&
                    isShowFavoriteBadge)) && (
                  <div className="size-3 bg-secondary absolute -top-0.5 -right-1.5 rounded-full text-[0.7rem] flex items-center justify-center text-white font-semibold">
                    {item.href === PagesConfig.CART
                      ? cartCount
                      : favoriteProductsIds.length }
                  </div>
                )}
              </div>

              <span className="text-sm font-medium transition-opacity group-hover:opacity-100 opacity-50">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}
