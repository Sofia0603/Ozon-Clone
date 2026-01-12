import { Header } from '@/components/layout/header/Header';
import { TopMenu } from '@/components/layout/top-menu/TopMenu';
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <div className="container mx-auto mb-20">
        <div className="bg-white rounded-b-3xl">
          <Header />
          <TopMenu />
        </div>
          {children}
      </div>
    </NextIntlClientProvider>
  );
}
