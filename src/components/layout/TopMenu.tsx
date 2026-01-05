import {topMenu} from "@/components/layout/top-menu.data";
import Link from "next/link";
import cn from "clsx";

export function TopMenu(){
    return (
        <nav className="flex items-center gap-6 mt-6 mx-5">
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
    )
}