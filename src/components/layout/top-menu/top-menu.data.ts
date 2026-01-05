import {
  Banana, BriefcaseBusiness, CreditCard, LucideIcon, Plane,

} from "lucide-react";
import {PagesConfig} from "@/config/config.pages";

export interface ITopMenuItem{
  title: string;
  href: string;
  icon?: LucideIcon
}

export const topMenu: ITopMenuItem[] = [
  {
    title: "Озон fresh",
    icon: Banana,
    href: PagesConfig.FRESH,
  },
  {
    title: "Озон карта",
    icon: CreditCard,
    href: PagesConfig.OZON_CARD,
  },
  {
    title: "Авиа-билеты",
    icon: Plane,
    href: PagesConfig.AIR_TICKETS,
  },
  {
    title: "Для бизнеса",
    icon: BriefcaseBusiness,
    href: PagesConfig.FOR_BUSINESS,
  },
  {
    title: "Одежда",
    href: PagesConfig.CLOTHING,
  },
  {
    title: "Электроника",
    href: PagesConfig.ELECTRONICS,
  },
  {
    title: "Дом и сад",
    href: PagesConfig.HOME_AND_GARDEN,
  },
  {
    title: "Товары за 1Р",
    href: PagesConfig.PRODUCTS_FOR_1_RUB,
  },
  {
    title: "Сертификаты",
    href: PagesConfig.CERTIFICATES,
  },

] as const

