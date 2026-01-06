'use client';

import Image from 'next/image';
import { LayoutGrid, Search } from 'lucide-react';
import { headerMenu } from '@/components/layout/header/header-menu.data';
import Link from 'next/link';

import cn from 'clsx';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('header');

  return (
    <header className="grid grid-cols-[2fr_7fr_2fr] gap-5 items-center pt-3 mx-5">
      <div className="flex items-center gap-7">
        <Link href="/">
          <Image src="/ozon.png" alt="ozon" width={120} height={60} />
        </Link>
        <button className="bg-primary p-2 rounded-lg text-white flex items-center gap-2 font-medium">
          <LayoutGrid />
          <span>{t('catalogTitle')}</span>
        </button>
      </div>

      <div className="rounded-xl p-1 flex items-center bg-primary">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value=""
          onChange={() => {}}
          className="bg-white rounded-lg px-4 py-1.5 w-full"
        />
        <button className="px-6">
          <Search color="#fff" />
        </button>
      </div>

      <div className="flex gap-5 items-center ml-2 justify-end">
        {headerMenu.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'flex flex-col items-center transition-opacity hover:opacity-100 opacity-50',
              index === 0 && 'opacity-100'
            )}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
    </header>
  );
}
