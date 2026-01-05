'use client'

import {useMemo, useState} from "react";
import {LANGUAGES} from "@/components/layout/top-menu/language-switcher/languages.data";
import cookies from "js-cookie";

export function LanguageSwitcher(){

    const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ru'>(cookies.get('locale') === 'en' ? 'en' : 'ru')

    const toggleHandler = () => {
      const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru' ;
      setCurrentLanguage(newLanguage);
      cookies.set('locale', newLanguage);
    }

    const language = useMemo(() => {
        return LANGUAGES.find((lang => lang.code === currentLanguage))
    }, [currentLanguage])


    return (
      <button className="flex items-center gap-1.5 group w-11"
      onClick={toggleHandler}
      >
        <span className="text-lg group-hover:rotate-6 transition-transform">
            {language?.flag}
        </span>
        <span className="uppercase font-medium opacity-50
        transition-opacity group-hover:opacity-100">
            {language?.code}
        </span>
     </button>
    )

}