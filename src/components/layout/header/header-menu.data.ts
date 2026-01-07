import { Heart, Package, ShoppingBasket, User } from 'lucide-react';
import { PagesConfig } from '@/config/config.pages';

export const headerMenu = [
  {
    title: 'Заказы',
    icon: Package,
    href: PagesConfig.ORDERS,
  },
  {
    title: 'Избранное',
    icon: Heart,
    href: PagesConfig.FAVORITES,
  },
  {
    title: 'Корзина',
    icon: ShoppingBasket,
    href: PagesConfig.CART,
  },
] as const;
