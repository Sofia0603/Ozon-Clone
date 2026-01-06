import {topMenu} from "@/components/layout/top-menu/top-menu.data";
import Link from "next/link";
import cn from "clsx";
import {LanguageSwitcher} from "@/components/layout/top-menu/language-switcher/LanguageSwitcher";
import {Dot} from "lucide-react";

export function TopMenu(){
    return (
        <div className="flex justify-between items-center mt-6 mx-5">
            <nav className="flex items-center gap-4 ">
            {topMenu.map((menuItem,index) => (
                <Link
                    key={menuItem.title}
                    href={menuItem.href}
                    className={cn (
                        'flex gap-1 items-center transition-opacity font-medium text-sm hover:opacity-100 opacity-50',
                        index === 0 && 'opacity-100 text-teal-600'
                    )}
                >
                    {menuItem.icon &&
                      <menuItem.icon
                          size={16}
                          style={{marginRight:4}}
                      />
                    }

                    <span>{menuItem.title}</span>
                </Link>
            ))}
        </nav>
        <div className="flex items-center gap-4">
            <div className="font-medium flex items-center text-sm">
                 <span className='opacity-50'>Москва</span>
                <Dot className="opacity-50" />
                <button className='text-primary font-semibold'>Укажите адрес</button>
            </div>

            <div>
                <LanguageSwitcher />
            </div>
        </div>
        </div>
    )
}