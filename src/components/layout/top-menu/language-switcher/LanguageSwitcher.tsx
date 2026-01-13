'use client';
import { useMemo } from 'react';
import { LANGUAGES } from '@/components/layout/top-menu/language-switcher/languages.data';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'use-intl';
import { useTransition } from 'react';
import { LandPlot, Loader } from 'lucide-react'

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const toggleHandler = () => {
    const newLanguage = locale === 'ru' ? 'en' : 'ru';

    startTransition(() => {
      router.replace(pathname, { locale: newLanguage });
    });
  };

  const language = useMemo(() => {
    return LANGUAGES.find((lang) => lang.code === locale);
  }, [locale]);

  return (
    <button className="flex items-center gap-1.5 group w-11" onClick={toggleHandler}>
      <span className="text-lg group-hover:rotate-6 transition-transform">
        {isPending ? <span className="ml-1 animate-spin"> <Loader size={14} className='text-neutral-400' /></span> : <LandPlot size={14} className='text-neutral-400'/>}
      </span>
      <span
        className="uppercase font-medium opacity-50 transition-opacity group-hover:opacity-100"
      >
        {language?.code}
      </span>
    </button>
  );
}
