'use client'

import Image from "next/image";
import {LayoutGrid, Search} from "lucide-react";
import {headerMenu} from "@/components/layout/header-menu.data";
import Link from "next/link";

import cn from 'clsx'

export function Header() {
  return  (
    <header className="grid grid-cols-[1fr_1fr_7fr_2fr] gap-5 items-center mt-3 mx-5">
      <Image
        src="/ozon.png"
        alt="ozon"
        width={120}
        height={60}
      />

      <button className='bg-primary p-2 rounded-lg text-white flex items-center gap-2'>
        <LayoutGrid/>
        <span>Каталог</span>
      </button>


      <div className='rounded-xl p-1 flex items-center bg-primary'>
        <input
          type="text"
          placeholder="Искать на озон"
          value=""
          onChange={() => {}}
          className="bg-white rounded-lg px-4 py-1.5 w-full"
        />
        <button className='px-6'>
          <Search color='#fff'/>
        </button>
      </div>


      <div className="flex gap-5 items-center ml-2">
        {headerMenu.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn (
              'flex flex-col items-center transition-opacity hover:opacity-100 opacity-50',
                index === 0 && 'opacity-100'
            )}
          >
            <item.icon size={20} />
            <span
             className='text-sm font-medium'
            >{item.title}</span>
          </Link>
        ))}
      </div>

  </header>
  )
}