'use client';

import Image from 'next/image';
import { LayoutGrid, Search, User } from 'lucide-react';
import { headerMenu } from '@/components/layout/header/header-menu.data';
import Link from 'next/link';

import cn from 'clsx';
import { useTranslations } from 'next-intl';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Auth } from './Auth'

export function Header() {
  const tHeader = useTranslations('header');

  const { isOpen, ref, setIsOpen } = useOutsideClick<HTMLDivElement>(false);

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
          <button className={cn('flex flex-col items-center')} onClick={() => setIsOpen(true)}>
            <User size={20} />
            <span className="text-sm font-medium">Войти</span>
          </button>

          {headerMenu.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'flex flex-col items-center transition-opacity hover:opacity-100 opacity-50',
              )}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      </header>

      {isOpen && <Auth setIsOpen={setIsOpen} ref={ref} />}
    </>
  );
}
