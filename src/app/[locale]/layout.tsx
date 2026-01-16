import { Header } from '@/components/layout/header/Header';
import { TopMenu } from '@/components/layout/top-menu/TopMenu';
import { routing } from '@/i18n/routing';
import { getCart } from '@/lib/actions/cart'
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const cart = await getCart()

  return (
    <NextIntlClientProvider>
      <div className="container mx-auto mb-20">
        <div className="bg-white rounded-b-3xl">
          <Header cartCount={cart.count} />
          <TopMenu />
        </div>
          {children}
      </div>
    </NextIntlClientProvider>
  );
}
